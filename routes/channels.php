<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('profile-{id}', function($user) {
    return ['user' => $user];
});
