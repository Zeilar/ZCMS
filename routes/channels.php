<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('profile-{id}', function($user, $id) {
    return ['user' => $user, 'profileId' => $id];
});
