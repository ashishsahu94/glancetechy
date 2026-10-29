<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Creates the cities table. (This file used to try to ADD state_id to a table
 * that did not exist yet, so a fresh local database could not be migrated.)
 * state_id is added later by 2026_10_06_091845_add_state_id_to_cities_table.php,
 * after the states table exists.
 */
return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('cities')) {
            return; // already there (production)
        }

        Schema::create('cities', function (Blueprint $table) {
            $table->id();

            $table->foreignId('country_id')->constrained('countries')->cascadeOnDelete();

            $table->string('name');
            $table->string('slug');

            $table->text('short_description')->nullable();

            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();

            $table->boolean('status')->default(true);
            $table->integer('sort_order')->default(0);

            $table->timestamps();

            $table->unique(['country_id', 'slug']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cities');
    }
};
