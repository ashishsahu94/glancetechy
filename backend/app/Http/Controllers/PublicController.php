<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Project;
use App\Models\Testimonial;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Website ke liye public (bina login) read-only endpoints.
 */
class PublicController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Projects
    |--------------------------------------------------------------------------
    |
    | GET /api/projects
    | GET /api/projects?featured=1
    | GET /api/projects?limit=4
    |
    */

    public function projects(Request $request): JsonResponse
    {
        $query = Project::query()->ordered();

        if ($request->boolean('featured')) {
            $query->where('featured', true);
        }

        $limit = $this->limit($request);

        if ($limit > 0) {
            $query->limit($limit);
        }

        $projects = $query
            ->get()
            ->map(fn (Project $project) => $project->toApi())
            ->values();

        return response()->json($projects);
    }


    /*
    |--------------------------------------------------------------------------
    | Blog Posts
    |--------------------------------------------------------------------------
    |
    | GET /api/posts
    | GET /api/posts?limit=3
    |
    */

    public function posts(Request $request): JsonResponse
    {
        $query = Post::query()->ordered();

        $limit = $this->limit($request);

        if ($limit > 0) {
            $query->limit($limit);
        }

        $posts = $query
            ->get()
            ->map(fn (Post $post) => $post->toApi())
            ->values();

        return response()->json($posts);
    }


    /*
    |--------------------------------------------------------------------------
    | Single Blog Post
    |--------------------------------------------------------------------------
    |
    | GET /api/posts/{slug}
    |
    */

    public function post(string $slug): JsonResponse
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


    /*
    |--------------------------------------------------------------------------
    | Testimonials
    |--------------------------------------------------------------------------
    |
    | GET /api/testimonials
    |
    */

    public function testimonials(): JsonResponse
    {
        $testimonials = Testimonial::query()
            ->ordered()
            ->get()
            ->map(fn (Testimonial $testimonial) => $testimonial->toApi())
            ->values();

        return response()->json($testimonials);
    }


    /*
    |--------------------------------------------------------------------------
    | Limit Helper
    |--------------------------------------------------------------------------
    */

    private function limit(Request $request): int
    {
        return max(
            0,
            min(
                100,
                (int) $request->query('limit', 0)
            )
        );
    }
}