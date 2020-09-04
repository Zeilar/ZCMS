<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Chatmessage extends Model
{
    protected $guarded = [];

    public static $MAX_PER_PAGE = 30;

    public function user() {
        return $this->belongsTo(User::class);
    }
}