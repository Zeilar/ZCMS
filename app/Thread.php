<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Thread extends Model
{
    protected $guarded = [];

    public function user() {
        return $this->hasOne(User::class);
    }

    public function posts() {
        return $this->hasMany(Post::class);
    }

    public function opPost() {
        return $this->posts()->limit(1)->first() ?? false;
    }

    public function op() {
        return $this->opPost()->user ?? false;
    }
}