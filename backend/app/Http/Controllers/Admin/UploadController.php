<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Support\Media;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UploadController extends Controller
{
    // POST /api/admin/upload  (multipart: file)
    public function store(Request $request): JsonResponse
    {
        $file = $request->file('file');
        if (! $file) {
            return response()->json(['error' => 'No file was received.'], 422);
        }

        try {
            return response()->json(['url' => Media::url(Media::store($file))]);
        } catch (\InvalidArgumentException $e) {
            return response()->json(['error' => $e->getMessage()], 422);
        }
    }
}
