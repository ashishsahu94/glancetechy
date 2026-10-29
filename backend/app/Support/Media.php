<?php

namespace App\Support;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;

/**
 * Admin se upload hui images public/uploads/ me rakhi jaati hain
 * aur DB me sirf relative path ("/uploads/<uuid>.png") save hota hai.
 * API output me ye absolute URL ban jaata hai, taaki frontend (alag domain) seedha dikha sake.
 */
final class Media
{
    public const MAX_BYTES = 5 * 1024 * 1024; // 5 MB
    public const NAME_RE = '/^[a-f0-9-]{36}\.(jpg|png|webp|avif)$/';

    private const EXT = [
        'image/jpeg' => 'jpg',
        'image/png' => 'png',
        'image/webp' => 'webp',
        'image/avif' => 'avif',
    ];

    public static function dir(): string
    {
        return public_path('uploads');
    }

    /** Live folder that contains /uploads. Change it here only if the live path changes. */
    private const LIVE_BASE = 'https://glancetechy.com/backend/public';

    /** Base URL for images: always live, and never contains index.php. */
    private static function base(): string
    {
        return rtrim(self::LIVE_BASE, '/');
    }

    /** DB wala path -> API ke liye poora URL. /assets/... (frontend ki apni files) ko chhoota nahi. */
    public static function url(?string $path): string
    {
        $path = (string) $path;

        return str_starts_with($path, '/uploads/') ? self::base().$path : $path;
    }

    /** Form se aaya absolute URL (is API ka) -> relative path. */
    public static function relative(string $value): string
    {
        // Any absolute URL ending in /uploads/<uuid>.<ext> is one of our own uploads.
        if (preg_match('#/uploads/([a-f0-9-]{36}\.(?:jpg|png|webp|avif))$#', $value, $m)) {
            return '/uploads/'.$m[1];
        }

        return $value;
    }

    /** @return string relative path, jaise "/uploads/abc.png" */
    public static function store(UploadedFile $file): string
    {
        if (! $file->isValid()) {
            throw new \InvalidArgumentException('Upload failed (the file may be too large).');
        }
        if ($file->getSize() > self::MAX_BYTES) {
            throw new \InvalidArgumentException('Image is larger than 5 MB.');
        }

        $ext = self::EXT[(string) $file->getMimeType()] ?? null;
        if (! $ext) {
            throw new \InvalidArgumentException('Only JPG, PNG, WEBP or AVIF images are allowed.');
        }
        if (! self::matchesType((string) file_get_contents($file->getRealPath(), false, null, 0, 16), $ext)) {
            throw new \InvalidArgumentException('This file does not look like a valid image.');
        }

        if (! is_dir(self::dir())) {
            mkdir(self::dir(), 0755, true);
        }
        $name = (string) Str::uuid().'.'.$ext;
        $file->move(self::dir(), $name);

        return '/uploads/'.$name;
    }

    public static function delete(mixed $path): void
    {
        if (! is_string($path) || ! str_starts_with($path, '/uploads/')) {
            return; // /assets/... jaisi files nahi chhoote
        }
        $name = substr($path, strlen('/uploads/'));
        if (preg_match(self::NAME_RE, $name)) {
            @unlink(self::dir().DIRECTORY_SEPARATOR.$name);
        }
    }

    // File ke andar ke bytes check karte hain, sirf naam/type pe bharosa nahi
    private static function matchesType(string $head, string $ext): bool
    {
        return match ($ext) {
            'jpg' => str_starts_with($head, "\xFF\xD8\xFF"),
            'png' => str_starts_with($head, "\x89PNG"),
            'webp' => substr($head, 0, 4) === 'RIFF' && substr($head, 8, 4) === 'WEBP',
            'avif' => substr($head, 4, 4) === 'ftyp',
            default => false,
        };
    }
}