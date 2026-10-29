<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasColumn('posts', 'faqs')) {
            Schema::table('posts', function (Blueprint $table) {
                $table->text('faqs')->nullable();
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('posts', 'faqs')) {
            Schema::table('posts', function (Blueprint $table) {
                $table->dropColumn('faqs');
            });
        }
    }
};
