<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Chatmessage extends Model
{
    public function user() {
        return $this->belongsTo(User::class);
    }
}