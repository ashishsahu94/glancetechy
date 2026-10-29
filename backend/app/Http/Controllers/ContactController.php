<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

/** POST /api/contact - sends the contact form by mail (SMTP / Gmail from .env). */
class ContactController extends Controller
{
    public function send(Request $request): JsonResponse
    {
        // Honeypot: bots fill the hidden "website" field, humans do not
        if ($request->filled('website')) {
            return response()->json(['ok' => true]);
        }

        $clean = fn (string $key, int $max) => mb_substr(trim((string) $request->input($key, '')), 0, $max);

        $name = $clean('name', 120);
        $email = $clean('email', 120);
        $phone = $clean('phone', 40);
        $company = $clean('company', 120);
        $service = $clean('service', 120);
        $budget = $clean('budget', 80);
        $message = $clean('message', 3000);

        if ($name === '' || $service === '' || $message === '') {
            return response()->json(['error' => 'Please fill in all required fields.'], 422);
        }
        if (! filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return response()->json(['error' => 'Please enter a valid email address.'], 422);
        }
        if ($phone !== '' && ! preg_match('/^[0-9+()\-\s]{6,40}$/', $phone)) {
            return response()->json(['error' => 'Please enter a valid phone number.'], 422);
        }

        $to = config('app.contact_to') ?: config('mail.from.address');
        if (! $to || ! config('mail.mailers.smtp.username')) {
            Log::error('Contact form: MAIL_* / CONTACT_TO_EMAIL are not set in .env.');

            return response()->json(['error' => 'Our contact form is not set up yet. Please email us directly.'], 500);
        }

        $oneLine = fn (string $v) => preg_replace('/[\r\n]+/', ' ', $v);

        $body = implode("\n", [
            "Name: $name",
            "Email: $email",
            'Phone: '.($phone ?: '-'),
            'Company / website: '.($company ?: '-'),
            "Service: $service",
            'Budget: '.($budget ?: '-'),
            '',
            'Message:',
            $message,
        ]);

        try {
            Mail::raw($body, function ($mail) use ($to, $email, $oneLine, $name, $service) {
                $mail->to($to)
                    ->replyTo($email)
                    ->subject($oneLine("New enquiry: $service - $name"));
            });
        } catch (\Throwable $e) {
            Log::error('Contact form error: '.$e->getMessage());

            return response()->json(['error' => 'Could not send your message. Please try again.'], 500);
        }

        return response()->json(['ok' => true]);
    }
}
