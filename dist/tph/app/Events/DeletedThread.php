<?php

namespace App\Events;

use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;

class DeletedThread implements ShouldBroadcastNow
{
    use Dispatchable, SerializesModels;

    public function broadcastOn()
    {
        return new Channel('admin-statistics');
    }
}
