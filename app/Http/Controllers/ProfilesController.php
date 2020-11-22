<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Setting;
use App\Models\Thread;
use App\Models\Post;
use App\Models\User;

class ProfilesController extends Controller
{
    protected $perPage;

    public function __construct() {
        $this->perPage = Setting::get('perPage', auth()->user());
    }

    public function show(User $user) {
        return response($user);
    }

    public function posts(User $user) {
        return response($user->posts()->paginate($this->perPage));
    }

    public function threads(User $user) {
        return response($user->threads()->paginate($this->perPage));
    }

    /*
    public function messages(User $user) {
        
    }
    */
}
