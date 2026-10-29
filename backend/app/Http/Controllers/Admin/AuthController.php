<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Support\AdminToken;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    // POST /api/admin/login  (routes me throttle laga hai: 5 attempts per 10 minutes)
    public function login(Request $request): JsonResponse
    {
        $email = (string) $request->input('email', '');
        $password = (string) $request->input('password', '');

        try {
            $ok = AdminToken::checkCredentials($email, $password);
        } catch (\Throwable $e) {
            Log::error('Admin login setup error: '.$e->getMessage());

            return response()->json(['error' => 'Server setup is incomplete. Check ADMIN_EMAIL, ADMIN_PASSWORD and APP_KEY in .env.'], 500);
        }

        if (! $ok) {
            usleep(600_000); // guess karna dheema
            return response()->json(['error' => 'Incorrect email or password.'], 401);
        }

        return response()->json(['ok' => true, 'token' => AdminToken::make()]);
    }

    // POST /api/admin/logout  (token stateless hai, the frontend removes its own token)
    public function logout(): JsonResponse
    {
        return response()->json(['ok' => true]);
    }
}
