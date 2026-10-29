<?php

namespace App\Support;

use App\Models\Post;
use App\Models\Project;
use App\Models\Testimonial;
use Illuminate\Support\Str;

/**
 * Fields and validation for the three admin resources (projects, posts, testimonials).
 * The form fields shown in the admin panel live in frontend/lib/admin-config.ts; this class does the server-side checks.
 */
final class Resources
{
    public const KEYS = ['projects', 'posts', 'testimonials'];

    public const SOURCES = ['google', 'freelancer', 'upwork', 'fiverr', 'clutch', 'linkedin', 'facebook', 'whatsapp', 'direct'];

    /** Maximum article length in characters (HTML tags included). The DB column is LONGTEXT, so this is only a safety limit. */
    public const CONTENT_MAX = 200000;

    public const ART = ['seo', 'speed', 'ppc', 'social', 'email', 'content'];

    public static function isResource(string $key): bool
    {
        return in_array($key, self::KEYS, true);
    }

    /** @return class-string<\Illuminate\Database\Eloquent\Model> */
    public static function model(string $key): string
    {
        return match ($key) {
            'projects' => Project::class,
            'posts' => Post::class,
            'testimonials' => Testimonial::class,
        };
    }

    /** Names of the image fields (so the old file can be removed on delete / replace) */
    public static function imageFields(string $key): array
    {
        return array_keys(array_filter(self::fields($key), fn ($f) => $f['type'] === 'image'));
    }

    /** @return array<string, array{label:string,type:string,required?:bool,max?:int,options?:array}> */
    public static function fields(string $key): array
    {
        return match ($key) {
            'projects' => [
                'title' => ['label' => 'Project name', 'type' => 'text', 'required' => true, 'max' => 100],
                'category' => ['label' => 'Category', 'type' => 'text', 'required' => true, 'max' => 100],
                'href' => ['label' => 'Live site link', 'type' => 'url', 'required' => true],
                'img' => ['label' => 'Project image', 'type' => 'image', 'required' => true],
                'description' => ['label' => 'Description', 'type' => 'textarea', 'max' => 1500],
                'bg' => ['label' => 'Background color', 'type' => 'color'],
                'featured' => ['label' => 'Show on home page', 'type' => 'boolean'],
            ],
            'posts' => [
                'title' => ['label' => 'Title', 'type' => 'text', 'required' => true, 'max' => 140],
                'slug' => ['label' => 'URL name (slug)', 'type' => 'text', 'max' => 80],
                'category' => ['label' => 'Category', 'type' => 'text', 'required' => true, 'max' => 80],
                'date' => ['label' => 'Date', 'type' => 'date', 'required' => true],
                'excerpt' => ['label' => 'Short summary', 'type' => 'textarea', 'required' => true, 'max' => 300],
                'image' => ['label' => 'Cover image', 'type' => 'image'],
                'art' => ['label' => 'Cover design', 'type' => 'select', 'options' => self::ART],
                'content' => ['label' => 'Article content', 'type' => 'paragraphs', 'required' => true],
                'faqs' => ['label' => 'FAQ', 'type' => 'textarea', 'max' => 6000],
                'focus_keyword' => ['label' => 'Focus keyword', 'type' => 'text', 'max' => 255],
                'meta_title' => ['label' => 'SEO title', 'type' => 'text', 'max' => 255],
                'meta_description' => ['label' => 'SEO description', 'type' => 'textarea', 'max' => 1000],
            ],
            'testimonials' => [
                'name' => ['label' => 'Client name', 'type' => 'text', 'required' => true, 'max' => 80],
                'role' => ['label' => 'Role / company', 'type' => 'text', 'required' => true, 'max' => 100],
                'source' => ['label' => 'Review source', 'type' => 'select', 'options' => self::SOURCES],
                'source_url' => ['label' => 'Review link', 'type' => 'url', 'max' => 500],
                'quote' => ['label' => 'Review', 'type' => 'textarea', 'required' => true, 'max' => 500],
                'avatar' => ['label' => 'Photo', 'type' => 'image'],
            ],
        };
    }

    /**
     * Cleans the form data and reports any errors.
     *
     * @return array{0: array<string, mixed>, 1: array<string, string>} [data, errors]
     */
    public static function normalize(string $key, mixed $input): array
    {
        $src = is_array($input) ? $input : [];
        $data = [];
        $errors = [];

        foreach (self::fields($key) as $name => $f) {
            $raw = $src[$name] ?? null;
            $label = $f['label'];
            $required = $f['required'] ?? false;

            if ($f['type'] === 'boolean') {
                $data[$name] = $raw === true;
                continue;
            }

            if ($f['type'] === 'paragraphs') {
                $text = is_array($raw) ? implode("\n\n", array_map('strval', $raw)) : (is_string($raw) ? $raw : '');
                $text = str_replace("\r\n", "\n", $text);
                $parts = array_values(array_filter(array_map('trim', preg_split('/\n{2,}/', $text) ?: []), fn ($s) => $s !== ''));
                if ($required && ! $parts) {
                    $errors[$name] = "$label is required.";
                } elseif (mb_strlen(implode('', $parts)) > self::CONTENT_MAX) {
                    $errors[$name] = 'The article content is too long (maximum ' . number_format(self::CONTENT_MAX) . ' characters, HTML tags included).';
                }
                $data[$name] = $parts;
                continue;
            }

            $str = is_string($raw) ? trim($raw) : '';
            if ($f['type'] === 'image') {
                $str = Media::relative($str);
            }

            if ($str === '') {
                if ($required) {
                    $errors[$name] = "$label is required.";
                }
                $data[$name] = '';
                continue;
            }

            $max = $f['max'] ?? ($f['type'] === 'textarea' ? 1000 : 300);
            if (mb_strlen($str) > $max) {
                $errors[$name] = "$label cannot be longer than $max characters.";
                continue;
            }

            if ($f['type'] === 'url' && ! preg_match('#^https?://\S+$#i', $str)) {
                $errors[$name] = 'Enter the full link (https://...).';
            } elseif ($f['type'] === 'image' && ! (preg_match('#^/(?!/)\S*$#', $str) || preg_match('#^https://\S+$#i', $str))) {
                $errors[$name] = 'The image is not valid.';
            } elseif ($f['type'] === 'color' && ! preg_match('/^#[0-9a-fA-F]{6}$/', $str)) {
                $errors[$name] = 'Use the color format #rrggbb.';
            } elseif ($f['type'] === 'date' && ! self::validDate($str)) {
                $errors[$name] = 'Choose a valid date.';
            } elseif ($f['type'] === 'select' && ! in_array($str, $f['options'] ?? [], true)) {
                $errors[$name] = 'Choose a valid option.';
            } elseif ($name === 'slug' && ! preg_match('/^[a-z0-9]+(?:-[a-z0-9]+)*$/', $str)) {
                $errors[$name] = "The URL name can only contain lowercase English letters, numbers and '-'.";
            }

            $data[$name] = $str;
        }

        return [$data, $errors];
    }

    /** Builds a unique slug for posts (from the title, or from the slug given). */
    public static function uniqueSlug(array $data, ?string $exceptId = null): string
    {
        $base = (is_string($data['slug'] ?? null) && $data['slug'] !== '')
            ? $data['slug']
            : trim(substr(Str::slug((string) ($data['title'] ?? '')), 0, 80), '-');
        $base = $base !== '' ? $base : 'post';

        $slug = $base;
        $n = 2;
        while (Post::where('slug', $slug)->when($exceptId, fn ($q) => $q->where('id', '!=', $exceptId))->exists()) {
            $slug = $base.'-'.$n++;
        }

        return $slug;
    }

    private static function validDate(string $s): bool
    {
        if (! preg_match('/^(\d{4})-(\d{2})-(\d{2})$/', $s, $m)) {
            return false;
        }

        return checkdate((int) $m[2], (int) $m[3], (int) $m[1]);
    }
}