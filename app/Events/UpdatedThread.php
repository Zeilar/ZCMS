<?php

namespace App\Events;

use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Str;

class UpdatedThread
{
    use Dispatchable, SerializesModels;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($thread)
    {
        $properSlug = Str::slug($thread->title);
        if ($thread->slug !== $properSlug) {
            $thread->update(['slug' => $properSlug]);
        }
    }
}
