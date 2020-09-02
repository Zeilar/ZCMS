<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\Pivot;

class ChatroomUser extends Pivot
{
    protected $guarded = [];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function chatroom() {
        return $this->belongsTo(Chatroom::class);
    }
}