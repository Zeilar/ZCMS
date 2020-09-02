<?php

use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

use App\Chatroom;

Broadcast::channel('chat.{roomId}', function($user, $roomId) {
    $users = Chatroom::find($roomId)->users;
    return ['users' => $users, 'roomId' => $roomId];
});