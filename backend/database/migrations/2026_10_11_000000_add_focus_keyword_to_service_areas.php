<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        foreach (['countries', 'states', 'cities'] as $table) {
            Schema::table($table, function (Blueprint $t) {
                $t->string('focus_keyword', 255)->nullable()->after('short_description');
            });
        }
    }

    public function down(): void
    {
        foreach (['countries', 'states', 'cities'] as $table) {
            Schema::table($table, function (Blueprint $t) {
                $t->dropColumn('focus_keyword');
            });
        }
    }
};