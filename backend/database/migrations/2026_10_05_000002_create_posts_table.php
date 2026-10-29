<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('slug', 80)->unique();
            $table->string('title', 140);
            $table->string('category', 80);
            $table->date('date');
            $table->string('excerpt', 300);
            $table->string('art', 20)->default('seo');
            $table->string('image', 300)->default('');
            $table->longText('content'); // paragraphs ki JSON list
            $table->timestamps();

            $table->index('date');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
