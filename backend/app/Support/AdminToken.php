<?php

namespace App\Support;

use RuntimeException;

/**
 * Admin login ke baad ek signed token milta hai (7 din chalta hai).
 * Format: "<expiry-timestamp>.<hmac-signature>", signature APP_KEY se banta hai.
 */
final class AdminToken
{
    public const TTL = 7 * 24 * 60 * 60;

    public static function make(): string
    {
        $exp = (string) (time() + self::TTL);

        return $exp.'.'.self::sign($exp);
    }

    public static function verify(?string $token): bool
    {
        if (! $token || substr_count($token, '.') !== 1) {
            return false;
        }

        [$exp, $sig] = explode('.', $token, 2);

        return ctype_digit($exp)
            && hash_equals(self::sign($exp), $sig)
            && (int) $exp > time();
    }

    public static function checkCredentials(string $email, string $password): bool
    {
        $e = config('app.admin_email');
        $p = config('app.admin_password');

        if (! $e || ! $p) {
            throw new RuntimeException('ADMIN_EMAIL / ADMIN_PASSWORD are not set in .env.');
        }

        // Dono ko hash karke compare karte hain taaki timing se kuch pata na chale
        $okEmail = hash_equals(hash('sha256', strtolower(trim($e))), hash('sha256', strtolower(trim($email))));
        $okPass = hash_equals(hash('sha256', $p), hash('sha256', $password));

        return $okEmail && $okPass;
    }

    private static function sign(string $value): string
    {
        $key = (string) config('app.key');
        if ($key === '') {
            throw new RuntimeException('APP_KEY is not set. Run "php artisan key:generate".');
        }

        return rtrim(strtr(base64_encode(hash_hmac('sha256', $value, $key, true)), '+/', '-_'), '=');
    }
}
