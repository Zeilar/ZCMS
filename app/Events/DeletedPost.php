<?php

namespace App\Events;

use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class DeletedPost
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
}
