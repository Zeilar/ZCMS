<?php

use Illuminate\Support\Facades\Broadcast;
use App\Broadcasting\ShoutboxChannel;

Broadcast::channel('shoutbox', ShoutboxChannel::class);