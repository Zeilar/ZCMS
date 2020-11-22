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

    public static function cast($value, string $datatype) {
        switch ($datatype) {
            case 'string':
                return (string) $value;   
            case 'int':
                return (int) $value;
            case 'bool':
                return (bool) $value;
            case 'array':
                return (array) $value;
            case 'object':
                return (object) $value;
            default:
                return null;
        }
    }

    public static function get(string $setting, $user, $fallback = null) {
        $settingModel = Setting::where('name', $setting)->firstOrFail();
        $fallback = $fallback ?? $settingModel->default;
        if (!$user) return Setting::cast($fallback, $settingModel->datatype);
        return Setting::cast($user->getSetting($setting) ?? $fallback, $settingModel->datatype);
    }
}
