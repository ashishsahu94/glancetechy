<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('states', function (Blueprint $table) {
            $table->id();

            $table->foreignId('country_id')
                ->constrained('countries')
                ->cascadeOnDelete();

            $table->string('name');
            $table->string('slug');

            $table->text('short_description')->nullable();

            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();

            $table->boolean('status')->default(true);
            $table->integer('sort_order')->default(0);

            $table->timestamps();

            $table->unique([
                'country_id',
                'slug'
            ]);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('states');
    }
};