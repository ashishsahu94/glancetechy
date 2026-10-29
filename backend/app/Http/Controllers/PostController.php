<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\JsonResponse;

class PostController extends Controller
{
    /**
     * Get all blog posts.
     */
    public function index(): JsonResponse
    {
        $posts = Post::query()
            ->ordered()
            ->get()
            ->map(fn (Post $post) => $post->toApi())
            ->values();

        return response()->json($posts);
    }

    /**
     * Get single blog post by slug.
     */
    public function show(string $slug): JsonResponse
    {
        $post = Post::query()
            ->where('slug', $slug)
            ->first();

        if (!$post) {
            return response()->json([
                'error' => 'Post not found.',
            ], 404);
        }

        return response()->json(
            $post->toApi()
        );
    }
}