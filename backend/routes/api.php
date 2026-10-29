<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\ResourceController;
use App\Http\Controllers\Admin\ServiceAreaAdminController;
use App\Http\Controllers\Admin\UploadController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\ServiceAreaController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CareerController;

/*
|--------------------------------------------------------------------------
| API Routes  (all routes automatically get the /api prefix)
|--------------------------------------------------------------------------
*/

// GET /api/ping
Route::get('/ping', fn () => response()->json(['ok' => true, 'time' => now()->toIso8601String()]));

/*
|--------------------------------------------------------------------------
| PUBLIC WEBSITE APIs
|--------------------------------------------------------------------------
*/

Route::get('/projects', [PublicController::class, 'projects']);

Route::get('/posts', [PublicController::class, 'posts']);
Route::get('/posts/{slug}', [PublicController::class, 'post']);

Route::get('/testimonials', [PublicController::class, 'testimonials']);

Route::post('/contact', [ContactController::class, 'send'])->middleware('throttle:10,10');

Route::post('/careers/apply', [CareerController::class, 'apply'])->middleware('throttle:10,10');

/*
|--------------------------------------------------------------------------
| PUBLIC SERVICE AREAS  (Country -> State -> City)
|--------------------------------------------------------------------------
*/
Route::prefix('agency')->group(function () {
    Route::get('/', [ServiceAreaController::class, 'countries']);
    Route::get('/{country}', [ServiceAreaController::class, 'country']);
    Route::get('/{country}/{state}', [ServiceAreaController::class, 'state']);
    Route::get('/{country}/{state}/{city}', [ServiceAreaController::class, 'city']);
});

/*
|--------------------------------------------------------------------------
| ADMIN APIs
|--------------------------------------------------------------------------
*/
Route::prefix('admin')->group(function () {

    // POST /api/admin/login
    Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:5,10');

    // PROTECTED ADMIN ROUTES
    Route::middleware('admin')->group(function () {

        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/stats', [ResourceController::class, 'stats']);
        Route::post('/upload', [UploadController::class, 'store']);

        /*
        |------------------------------------------------------------------
        | SERVICE AREA ADMIN (Country -> State -> City)
        |------------------------------------------------------------------
        | /api/admin/countries, /api/admin/states, /api/admin/cities
        | Ye literal URLs hain, aur `resource` default se controller ko milta hai.
        | Ye ResourceController wale {resource} group se PEHLE rakhna.
        */
        foreach (['countries', 'states', 'cities'] as $area) {
            Route::get($area, [ServiceAreaAdminController::class, 'index'])->defaults('resource', $area);
            Route::post($area, [ServiceAreaAdminController::class, 'store'])->defaults('resource', $area);
            Route::get("$area/{id}", [ServiceAreaAdminController::class, 'show'])->defaults('resource', $area);
            Route::put("$area/{id}", [ServiceAreaAdminController::class, 'update'])->defaults('resource', $area);
            Route::delete("$area/{id}", [ServiceAreaAdminController::class, 'destroy'])->defaults('resource', $area);
        }

        /*
        |------------------------------------------------------------------
        | Projects / Posts / Testimonials
        |------------------------------------------------------------------
        */
        Route::prefix('{resource}')
            ->where(['resource' => 'projects|posts|testimonials'])
            ->group(function () {
                Route::get('/', [ResourceController::class, 'index']);
                Route::post('/', [ResourceController::class, 'store']);
                Route::get('/{id}', [ResourceController::class, 'show']);
                Route::put('/{id}', [ResourceController::class, 'update']);
                Route::delete('/{id}', [ResourceController::class, 'destroy']);
            });
    });
});