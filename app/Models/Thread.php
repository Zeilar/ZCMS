<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Thread extends Model
{
    use HasFactory, Searchable;

    public static $MAX_PER_PAGE = 20;

    protected $appends = ['latestPost', 'firstPost', 'postsAmount'];
    protected $with = ['user'];
    protected $guarded = [];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function category() {
        return $this->belongsTo(Category::class);
    }

    public function posts() {
        return $this->hasMany(Post::class);
    }

    public function getFirstPostAttribute(): Post {
        return $this->posts()->limit(1)->firstOrFail();
    }

    public function getLatestPostAttribute(): Post {
        return $this->posts()->latest()->limit(1)->firstOrFail();
    }

    public function getPostsAmountAttribute() {
        return $this->posts()->count();
    }
}
