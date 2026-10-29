<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasColumn('testimonials', 'source')) {
            Schema::table('testimonials', function (Blueprint $table) {
                $table->string('source', 30)->nullable();
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('testimonials', 'source')) {
            Schema::table('testimonials', function (Blueprint $table) {
                $table->dropColumn('source');
            });
        }
    }
};
