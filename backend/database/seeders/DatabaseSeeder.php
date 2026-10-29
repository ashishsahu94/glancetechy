<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\Project;
use App\Models\Testimonial;
use Illuminate\Database\Seeder;

/**
 * Starting content (from data/*.json) + service areas.
 * Content tables are only filled when empty, so running
 * "php artisan db:seed" again never creates duplicates.
 */
class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedContent(Project::class, 'projects');
        $this->seedContent(Post::class, 'posts');
        $this->seedContent(Testimonial::class, 'testimonials');

        $this->call([
            ServiceAreaSeeder::class,
        ]);
    }

    private function seedContent(string $model, string $file): void
    {
        if ($model::query()->exists()) {
            return;
        }

        $rows = json_decode((string) file_get_contents(__DIR__."/data/$file.json"), true) ?: [];
        $now = now();

        foreach ($rows as $i => $row) {
            // First item in the list must show up newest
            $stamp = $now->copy()->subSeconds($i);
            $item = new $model($row);
            $item->created_at = $stamp;
            $item->updated_at = $stamp;
            $item->save();
        }
    }
}
