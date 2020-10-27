<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chatmessage extends Model
{
    use HasFactory;

    protected $guarded = [];

    public static $MAX_PER_PAGE = 30;

    public function user() {
        return $this->belongsTo(User::class);
    }
}
