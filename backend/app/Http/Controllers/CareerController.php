<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

/** POST /api/careers/apply - mails a job application (with CV attached) using the same SMTP as the contact form. */
class CareerController extends Controller
{
    private const MAX_KB = 5120; // 5 MB

    public function apply(Request $request): JsonResponse
    {
        // Honeypot: bots fill the hidden "website" field, humans do not
        if ($request->filled('website')) {
            return response()->json(['ok' => true]);
        }

        $clean = fn (string $key, int $max) => mb_substr(trim((string) $request->input($key, '')), 0, $max);

        $job = $clean('job_title', 150);
        $name = $clean('name', 120);
        $email = $clean('email', 120);
        $phone = $clean('phone', 40);
        $experience = $clean('experience', 60);
        $link = $clean('link', 250);
        $message = $clean('message', 3000);

        if ($job === '' || $name === '' || $phone === '') {
            return response()->json(['error' => 'Please fill in all required fields.'], 422);
        }
        if (! filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return response()->json(['error' => 'Please enter a valid email address.'], 422);
        }
        if (! preg_match('/^[0-9+()\-\s]{6,40}$/', $phone)) {
            return response()->json(['error' => 'Please enter a valid phone number.'], 422);
        }
        if ($link !== '' && ! preg_match('#^https?://#i', $link)) {
            return response()->json(['error' => 'Portfolio link must start with http:// or https://'], 422);
        }

        // ---- CV file ----
        $cv = $request->file('cv');
        if (! $cv || ! $cv->isValid()) {
            return response()->json(['error' => 'Please attach your CV (PDF, DOC or DOCX, max 5 MB).'], 422);
        }
        if ($cv->getSize() > self::MAX_KB * 1024) {
            return response()->json(['error' => 'CV must be smaller than 5 MB.'], 422);
        }
        $ext = strtolower($cv->getClientOriginalExtension());
        $head = (string) @file_get_contents($cv->getRealPath(), false, null, 0, 8);
        $isPdf = str_starts_with($head, '%PDF');
        $isDocx = str_starts_with($head, "PK\x03\x04");                 // zip container
        $isDoc = str_starts_with($head, "\xD0\xCF\x11\xE0\xA1\xB1\x1A\xE1"); // old OLE format
        $okType = ($ext === 'pdf' && $isPdf) || ($ext === 'docx' && $isDocx) || ($ext === 'doc' && $isDoc);
        if (! $okType) {
            return response()->json(['error' => 'Please upload a valid PDF, DOC or DOCX file.'], 422);
        }

        $to = config('app.contact_to') ?: config('mail.from.address');
        if (! $to || ! config('mail.mailers.smtp.username')) {
            Log::error('Careers form: MAIL_* / CONTACT_TO_EMAIL are not set in .env.');

            return response()->json(['error' => 'Applications are not set up yet. Please email us directly.'], 500);
        }

        $oneLine = fn (string $v) => preg_replace('/[\r\n]+/', ' ', $v);

        $body = implode("\n", [
            "Role: $job",
            "Name: $name",
            "Email: $email",
            "Phone: $phone",
            'Experience: '.($experience ?: '-'),
            'Portfolio / LinkedIn: '.($link ?: '-'),
            '',
            'Message:',
            $message ?: '-',
        ]);

        $safeName = preg_replace('/[^A-Za-z0-9._-]+/', '_', pathinfo($name, PATHINFO_FILENAME)).'_CV.'.$ext;

        try {
            Mail::raw($body, function ($mail) use ($to, $email, $oneLine, $name, $job, $cv, $safeName) {
                $mail->to($to)
                    ->replyTo($email)
                    ->subject($oneLine("New application: $job - $name"))
                    ->attach($cv->getRealPath(), ['as' => $safeName, 'mime' => $cv->getMimeType()]);
            });
        } catch (\Throwable $e) {
            Log::error('Careers form error: '.$e->getMessage());

            return response()->json(['error' => 'Could not send your application. Please try again.'], 500);
        }

        return response()->json(['ok' => true]);
    }
}