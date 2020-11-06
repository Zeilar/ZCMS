<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Thread extends Model
{
    use HasFactory;

    public static $MAX_PER_PAGE = 20;
    protected $guarded = [];

    public function user() {
        return $this->hasOne(User::class);
    }

    public function category() {
        return $this->belongsTo(Category::class);
    }

    public function posts() {
        return $this->hasMany(Post::class);
    }

    public function opPost() {
        return $this->posts()->limit(1)->first();
    }

    public function op() {
        return $this->opPost()->user;
    }

    public function latestPost() {
        return $this->posts()->latest()->limit(1)->first();
    }
}
