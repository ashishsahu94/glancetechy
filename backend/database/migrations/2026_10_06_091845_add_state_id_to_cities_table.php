<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasColumn('cities', 'state_id')) {
            Schema::table('cities', function (Blueprint $table) {
                $table->foreignId('state_id')
                    ->nullable()
                    ->after('country_id')
                    ->constrained('states')
                    ->cascadeOnDelete();
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('cities', 'state_id')) {
            Schema::table('cities', function (Blueprint $table) {
                $table->dropForeign(['state_id']);
                $table->dropColumn('state_id');
            });
        }
    }
};