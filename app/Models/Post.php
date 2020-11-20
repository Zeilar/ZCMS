<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Events\CreatedPost;
use App\Events\DeletedPost;

class Post extends Model
{
    use HasFactory;

    public static $MAX_PER_PAGE = 20;
    
    protected $dispatchesEvents = ['saved' => CreatedPost::class, 'deleted' => DeletedPost::class];
    protected $with = ['user', 'postlikes'];
    protected $appends = ['pageNumber'];
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

    public function getPageNumberAttribute(): int {
        $posts = Post::where('thread_id', $this->thread_id)->get(['id'])->pluck('id');
        $index = $posts->search(fn($id) => $id === $this->id);
        return (int) floor($index / Post::$MAX_PER_PAGE) + 1;
    }
}
