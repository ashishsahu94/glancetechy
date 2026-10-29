<?php

namespace App\Http\Controllers;

use App\Models\Country;
use App\Models\State;
use App\Models\City;

class ServiceAreaController extends Controller
{
    /**
     * All countries
     */
    public function countries()
    {
        $countries = Country::query()
            ->where('status', true)
            ->with([
                'states' => function ($query) {
                    $query
                        ->where('status', true)
                        ->orderBy('sort_order')
                        ->orderBy('name');
                }
            ])
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get();

        return response()->json([
            'data' => $countries,
        ]);
    }

    /**
     * Single country + states
     */
    public function country(string $country)
    {
        $country = Country::query()
            ->where('slug', $country)
            ->where('status', true)
            ->with([
                'states' => function ($query) {
                    $query
                        ->where('status', true)
                        ->withCount([
                            'cities' => function ($cityQuery) {
                                $cityQuery->where('status', true);
                            }
                        ])
                        ->orderBy('sort_order')
                        ->orderBy('name');
                }
            ])
            ->firstOrFail();

        return response()->json([
            'data' => $country,
        ]);
    }

    /**
     * Single state + cities
     */
    public function state(string $country, string $state)
    {
        $state = State::query()
            ->where('slug', $state)
            ->where('status', true)
            ->whereHas('country', function ($query) use ($country) {
                $query
                    ->where('slug', $country)
                    ->where('status', true);
            })
            ->with([
                'country',
                'cities' => function ($query) {
                    $query
                        ->where('status', true)
                        ->orderBy('sort_order')
                        ->orderBy('name');
                }
            ])
            ->firstOrFail();

        return response()->json([
            'data' => $state,
        ]);
    }

    /**
     * Single city
     */
    public function city(
        string $country,
        string $state,
        string $city
    ) {
        $city = City::query()
            ->where('slug', $city)
            ->where('status', true)
            ->whereHas('state', function ($query) use ($state, $country) {
                $query
                    ->where('slug', $state)
                    ->where('status', true)
                    ->whereHas('country', function ($countryQuery) use ($country) {
                        $countryQuery
                            ->where('slug', $country)
                            ->where('status', true);
                    });
            })
            ->with([
                'country',
                'state',
            ])
            ->firstOrFail();

        return response()->json([
            'data' => $city,
        ]);
    }
}