<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\Country;
use App\Models\State;
use App\Support\Media;
use App\Support\Resources;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Admin CRUD: /api/admin/{resource}  (resource = projects | posts | testimonials)
 * The {resource} route is limited to these three names.
 */
class ResourceController extends Controller
{
    // GET /api/admin/stats
    public function stats(): JsonResponse
    {
        $counts = [];
        foreach (Resources::KEYS as $key) {
            $counts[$key] = Resources::model($key)::count();
        }

        $counts['countries'] = Country::count();
        $counts['states'] = State::count();
        $counts['cities'] = City::count();

        return response()->json($counts);
    }

    // GET /api/admin/{resource}
    public function index(string $resource): JsonResponse
    {
        $model = Resources::model($resource);

        return response()->json($model::query()->ordered()->get()->map->toApi()->values());
    }

    // GET /api/admin/{resource}/{id}
    public function show(string $resource, string $id): JsonResponse
    {
        $row = Resources::model($resource)::find($id);

        return $row ? response()->json($row->toApi()) : $this->notFound();
    }

    // POST /api/admin/{resource}
    public function store(Request $request, string $resource): JsonResponse
    {
        [$data, $errors] = Resources::normalize($resource, $request->json()->all());
        if ($errors) {
            return $this->invalid($errors);
        }
        if ($resource === 'posts') {
            $data['slug'] = Resources::uniqueSlug($data);
        }

        $item = Resources::model($resource)::create($data);

        return response()->json(['ok' => true, 'item' => $item->toApi()]);
    }

    // PUT /api/admin/{resource}/{id}
    public function update(Request $request, string $resource, string $id): JsonResponse
    {
        $row = Resources::model($resource)::find($id);
        if (! $row) {
            return $this->notFound();
        }

        [$data, $errors] = Resources::normalize($resource, $request->json()->all());
        if ($errors) {
            return $this->invalid($errors);
        }
        if ($resource === 'posts') {
            $data['slug'] = Resources::uniqueSlug($data, $row->id);
        }

        $before = $row->only(Resources::imageFields($resource));
        $row->update($data);

        // Image badli ho to purani file hata do
        foreach ($before as $field => $old) {
            if ($old !== $row->{$field}) {
                Media::delete($old);
            }
        }

        return response()->json(['ok' => true, 'item' => $row->fresh()->toApi()]);
    }

    // DELETE /api/admin/{resource}/{id}
    public function destroy(string $resource, string $id): JsonResponse
    {
        $row = Resources::model($resource)::find($id);
        if (! $row) {
            return $this->notFound();
        }

        $images = $row->only(Resources::imageFields($resource));
        $row->delete();
        foreach ($images as $path) {
            Media::delete($path);
        }

        return response()->json(['ok' => true]);
    }

    private function notFound(): JsonResponse
    {
        return response()->json(['error' => 'Record not found.'], 404);
    }

    private function invalid(array $errors): JsonResponse
    {
        return response()->json(['error' => 'There are errors in the form. Please check and try again.', 'errors' => $errors], 422);
    }
}
