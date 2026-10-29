<?php

namespace App\Models;

use App\Support\Media;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasUuids;

    protected $fillable = ['title', 'category', 'href', 'bg', 'img', 'description', 'featured'];

    protected $casts = ['featured' => 'boolean'];

    public function scopeOrdered(Builder $q): Builder
    {
        return $q->orderByDesc('created_at')->orderBy('id');
    }

    public function toApi(): array
    {
        return [
            'id' => (string) $this->id,
            'createdAt' => $this->created_at?->toIso8601String(),
            'title' => $this->title,
            'category' => $this->category,
            'href' => $this->href,
            'bg' => (string) $this->bg,
            'img' => Media::url($this->img),
            'description' => (string) $this->description,
            'featured' => (bool) $this->featured,
        ];
    }
}
