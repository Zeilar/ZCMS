<?php

namespace App\Events;

use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Events\NewPost;
use App\Models\Rank;

class CreatedPost
{
    use Dispatchable, SerializesModels;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($post)
    {
        $user = $post->user;
        Rank::each(function($rank) use ($user) {
            if ($user->posts()->count() >= $rank->threshold) {
                $user->ranks()->syncWithoutDetaching($rank->id);
            }
        });
        broadcast(new NewPost($post->thread));
    }
}
