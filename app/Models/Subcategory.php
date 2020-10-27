<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subcategory extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function threads() {
        return $this->hasMany(Thread::class);
    }

    public function category() {
        return $this->belongsTo(Category::class);
    }

    public function latestThread() {
        return $this->threads()->limit(1)->latest()->first() ?? false;
    }
}
