<?php

namespace App\Events;

use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Events\NewPost;
use App\Models\Rank;
use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;

class CreatedPost implements ShouldBroadcastNow
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
        // broadcast(new NewPost($post->thread)); // TODO: ->toOthers()
    }

    public function broadcastOn()
    {
        return new Channel('admin-statistics');
    }
}
