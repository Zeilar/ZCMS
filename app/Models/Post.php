<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Events\CreatedPost;

class Post extends Model
{
    use HasFactory;

    public static $MAX_PER_PAGE = 20;
    
    protected $dispatchesEvents = ['saved' => CreatedPost::class];
    protected $appends = ['isOp', 'isFirst'];
    protected $with = ['user'];
    protected $guarded = [];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function thread() {
        return $this->belongsTo(Thread::class);
    }

    public function postlikes() {
        return $this->hasMany(Postlike::class);
    }

    public function getIsFirstAttribute(): bool {
        return $this->id === $this->thread->opPost()->id;
    }

    public function getIsOpAttribute(): bool {
        return $this->user->id === $this->thread->op()->id;
    }
}
