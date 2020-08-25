<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $guarded = [];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function likes() {
        return $this->hasMany(PostLike::class);
    }

    public function solution() {
        return $this->hasOne(Comment::class, 'solutionTo_id', 'solution_id');
    }

    public function setSolution(Comment $comment) {
        $this->update(['solution_id' => $comment->id]);
        Comment::where('solutionTo_id', $this->id)->delete();
        $comment->setSolutionTo($this);
    }
}