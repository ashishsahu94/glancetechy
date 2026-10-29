<?php

namespace App\Models;

use App\Support\Media;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    use HasUuids;

    protected $fillable = ['name', 'role', 'quote', 'avatar', 'source', 'source_url'];

    public function scopeOrdered(Builder $q): Builder
    {
        return $q->orderByDesc('created_at')->orderBy('id');
    }

    public function toApi(): array
    {
        return [
            'id' => (string) $this->id,
            'createdAt' => $this->created_at?->toIso8601String(),
            'name' => $this->name,
            'role' => $this->role,
            'quote' => $this->quote,
            'avatar' => Media::url($this->avatar),
            'source' => (string) ($this->source ?? ''),
            'source_url' => (string) ($this->source_url ?? ''),
        ];
    }
}
