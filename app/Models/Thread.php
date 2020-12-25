<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;
use App\Events\CreatedThread;
use App\Events\UpdatedThread;
use App\Events\DeletedThread;

class Thread extends Model
{
    use HasFactory, Searchable;

    protected $dispatchesEvents = ['saved' => CreatedThread::class, 'updating' => UpdatedThread::class, 'deleted' => DeletedThread::Class];
    protected $appends = ['latestPost', 'firstPost', 'postsAmount'];
    protected $hidden = ['updated_at'];
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

    public function getFirstPostAttribute() {
        return $this->posts()->limit(1)->first();
    }

    public function getLatestPostAttribute() {
        return $this->posts()->latest()->limit(1)->first();
    }

    public function getPostsAmountAttribute() {
        return $this->posts()->count();
    }
}
