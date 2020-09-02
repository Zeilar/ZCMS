<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Chatroom extends Model
{
    protected $guarded = [];

    public function users() {
        return $this->hasMany(ChatroomUser::class);
    }

    public function messages() {
        return $this->hasMany(Chatmessage::class);
    }
}