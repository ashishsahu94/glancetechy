<?php

namespace App\Http\Middleware;

use App\Support\AdminToken;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! AdminToken::verify($request->bearerToken())) {
            return response()->json(['error' => 'Please log in first.'], 401);
        }

        return $next($request);
    }
}
