<?php

namespace App\Events;

use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;

class DeletedPost implements ShouldBroadcastNow
{
    use Dispatchable, SerializesModels;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($post)
    {
        $thread = $post->thread;
        if ($thread->posts()->count() <= 0) $thread->delete();
    }

    public function broadcastOn()
    {
        return new Channel('admin-statistics');
    }
}
