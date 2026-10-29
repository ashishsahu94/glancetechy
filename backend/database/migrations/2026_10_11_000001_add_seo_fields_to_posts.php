<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->string('focus_keyword', 255)->nullable();
            $table->string('meta_title', 255)->nullable();
            $table->string('meta_description', 1000)->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->dropColumn(['focus_keyword', 'meta_title', 'meta_description']);
        });
    }
};