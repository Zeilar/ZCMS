<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;

    protected $guarded = [];

    public static $PER_PAGE = 20;

    public function users() {
        return $this->belongsToMany(User::class);
    }
}
