<?php

namespace App\Models;

use App\Support\Media;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasUuids;

    protected $fillable = [
        'slug', 'title', 'category', 'date', 'excerpt', 'art', 'image', 'content',
        'faqs', 'focus_keyword', 'meta_title', 'meta_description',
    ];

    protected $casts = [
        'date' => 'date:Y-m-d',
        'content' => 'array',
    ];

    public function scopeOrdered(Builder $q): Builder
    {
        return $q->orderByDesc('date')->orderByDesc('created_at');
    }

    public function toApi(): array
    {
        return [
            'id' => (string) $this->id,
            'createdAt' => $this->created_at?->toIso8601String(),
            'slug' => $this->slug,
            'title' => $this->title,
            'category' => $this->category,
            'date' => $this->date?->format('Y-m-d'),
            'excerpt' => $this->excerpt,
            'art' => $this->art,
            'image' => Media::url($this->image),
            'content' => $this->content ?? [],
            'faqs' => (string) ($this->faqs ?? ''),
            'focus_keyword' => $this->focus_keyword ?? '',
            'meta_title' => $this->meta_title ?? '',
            'meta_description' => $this->meta_description ?? '',
        ];
    }
}