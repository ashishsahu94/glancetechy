<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\Country;
use App\Models\State;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

/**
 * Admin CRUD for Country -> State -> City.
 *
 *   /api/admin/countries   /api/admin/states   /api/admin/cities
 *
 * Same response contract as ResourceController (list = array, show = object,
 * store/update = {ok, item}, destroy = {ok}) so the admin UI is shared.
 */
class ServiceAreaAdminController extends Controller
{
    private const MODELS = [
        'countries' => Country::class,
        'states' => State::class,
        'cities' => City::class,
    ];

    private const NAMES = [
        'name' => 'Name',
        'slug' => 'URL Name',
        'country_id' => 'Country',
        'state_id' => 'State',
        'short_description' => 'Short Description',
        'focus_keyword' => 'Focus Keyword',
        'meta_title' => 'SEO Title',
        'meta_description' => 'SEO Description',
        'status' => 'Status',
        'sort_order' => 'Order',
    ];

    // GET /api/admin/{countries|states|cities}
    public function index(Request $request, string $resource): JsonResponse
    {
        $query = $this->query($resource);

        if ($resource === 'states' && $request->filled('country_id')) {
            $query->where('country_id', $request->integer('country_id'));
        }
        if ($resource === 'cities' && $request->filled('state_id')) {
            $query->where('state_id', $request->integer('state_id'));
        }

        $rows = $query->get()
            ->sortBy(fn ($r) => sprintf('%s|%06d|%s', $this->groupKey($resource, $r), $r->sort_order, mb_strtolower($r->name)))
            ->map(fn ($r) => $this->present($resource, $r))
            ->values();

        return response()->json($rows);
    }

    // GET /api/admin/{resource}/{id}
    public function show(string $id, string $resource): JsonResponse
    {
        $row = $this->query($resource)->find($id);

        return $row ? response()->json($this->present($resource, $row)) : $this->notFound();
    }

    // POST /api/admin/{resource}
    public function store(Request $request, string $resource): JsonResponse
    {
        [$data, $errors] = $this->validated($request, $resource);
        if ($errors) {
            return $this->invalid($errors);
        }

        $model = self::MODELS[$resource];
        $item = $model::create($data);

        return response()->json(['ok' => true, 'item' => $this->present($resource, $this->query($resource)->find($item->id))]);
    }

    // PUT /api/admin/{resource}/{id}
    public function update(Request $request, string $id, string $resource): JsonResponse
    {
        $row = $this->query($resource)->find($id);
        if (! $row) {
            return $this->notFound();
        }

        [$data, $errors] = $this->validated($request, $resource, $row->id);
        if ($errors) {
            return $this->invalid($errors);
        }

        $row->update($data);

        // A state moved to another country takes its cities along
        if ($resource === 'states') {
            City::where('state_id', $row->id)->update(['country_id' => $row->country_id]);
        }

        return response()->json(['ok' => true, 'item' => $this->present($resource, $this->query($resource)->find($row->id))]);
    }

    // DELETE /api/admin/{resource}/{id}  (states / cities below are removed by the DB cascade)
    public function destroy(string $id, string $resource): JsonResponse
    {
        $row = self::MODELS[$resource]::find($id);
        if (! $row) {
            return $this->notFound();
        }

        $row->delete();

        return response()->json(['ok' => true]);
    }

    /* ------------------------------------------------------------------ */

    private function query(string $resource)
    {
        return match ($resource) {
            'countries' => Country::query()->withCount(['states', 'cities']),
            'states' => State::query()->with('country')->withCount('cities'),
            'cities' => City::query()->with(['country', 'state']),
        };
    }

    private function groupKey(string $resource, $row): string
    {
        return match ($resource) {
            'countries' => '',
            'states' => mb_strtolower($row->country?->name ?? ''),
            'cities' => mb_strtolower(($row->country?->name ?? '').'|'.($row->state?->name ?? '')),
        };
    }

    /** Row for the admin UI. `label` is used by the parent dropdowns. */
    private function present(string $resource, $row): array
    {
        $base = $row->only([
            'id', 'name', 'slug', 'short_description', 'focus_keyword', 'meta_title', 'meta_description', 'status', 'sort_order',
        ]);

        return match ($resource) {
            'countries' => $base + [
                'label' => $row->name,
                'summary' => "States: {$row->states_count} • Cities: {$row->cities_count}",
            ],
            'states' => $base + [
                'country_id' => $row->country_id,
                'label' => ($row->country?->name ?? '-').' › '.$row->name,
                'summary' => ($row->country?->name ?? '-')." • Cities: {$row->cities_count}",
            ],
            'cities' => $base + [
                'country_id' => $row->country_id,
                'state_id' => $row->state_id,
                'label' => ($row->state?->name ?? '-').' › '.$row->name,
                'summary' => ($row->country?->name ?? '-').' › '.($row->state?->name ?? '-'),
            ],
        };
    }

    /** @return array{0: array, 1: array<string,string>} [clean data, errors] */
    private function validated(Request $request, string $resource, ?int $ignoreId = null): array
    {
        $input = $request->all();

        $input['slug'] = Str::slug((string) ($input['slug'] ?? '') ?: (string) ($input['name'] ?? ''));
        $input['status'] = filter_var($input['status'] ?? true, FILTER_VALIDATE_BOOLEAN);
        $input['sort_order'] = ($input['sort_order'] ?? '') === '' ? 0 : $input['sort_order'];

        // The state decides the country of a city
        if ($resource === 'cities' && ! empty($input['state_id'])) {
            $input['country_id'] = State::whereKey($input['state_id'])->value('country_id');
        }

        $slug = ['required', 'string', 'max:255'];
        $rules = [
            'name' => ['required', 'string', 'max:255'],
            'short_description' => ['nullable', 'string', 'max:2000'],
            'focus_keyword' => ['nullable', 'string', 'max:255'],
            'meta_title' => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string', 'max:1000'],
            'status' => ['boolean'],
            'sort_order' => ['integer', 'min:0', 'max:100000'],
        ];

        if ($resource === 'countries') {
            $slug[] = Rule::unique('countries', 'slug')->ignore($ignoreId);
        }
        if ($resource === 'states') {
            $rules['country_id'] = ['required', 'exists:countries,id'];
            $slug[] = Rule::unique('states', 'slug')->where('country_id', $input['country_id'] ?? 0)->ignore($ignoreId);
        }
        if ($resource === 'cities') {
            $rules['state_id'] = ['required', 'exists:states,id'];
            $rules['country_id'] = ['required', 'exists:countries,id'];
            $slug[] = Rule::unique('cities', 'slug')->where('state_id', $input['state_id'] ?? 0)->ignore($ignoreId);
        }
        $rules['slug'] = $slug;

        $validator = Validator::make($input, $rules, [
            'required' => ':attribute is required.',
            'max' => ':attribute is too long.',
            'exists' => 'The selected :attribute is not valid.',
            'integer' => ':attribute must be a number.',
            'min' => ':attribute must be 0 or greater.',
            'unique' => 'This :attribute already exists. Please enter another name.',
        ], self::NAMES);

        if ($validator->fails()) {
            $errors = [];
            foreach ($validator->errors()->messages() as $field => $messages) {
                $errors[$field] = $messages[0];
            }

            return [[], $errors];
        }

        return [array_intersect_key($validator->validated(), array_flip(array_keys($rules))), []];
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