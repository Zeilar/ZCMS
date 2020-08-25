<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $guarded = [];

    public function post() {
        return $this->belongsTo(Post::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function likes() {
        return $this->hasMany(CommentLike::class, 'post_id');
    }

    public function solutionTo() {
        return $this->belongsTo(Post::class, 'solution_id');
    }

    public function setSolutionTo(Post $post) {
        $this->update(['solutionTo_id' => $post->id]);
    }
}