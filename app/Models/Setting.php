<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function users() {
        return $this->belongsToMany(User::class);
    }

    public static function cast(string $value, string $datatype) {
        
    }

    public static function get(string $setting, $user, $fallback = null) {
        $fallback = $fallback ?? Setting::where('name', $setting)->firstOrFail()->default;
        if (!$user) return $fallback;
        return $user->getSetting($setting) ?? $fallback;
    }
}
