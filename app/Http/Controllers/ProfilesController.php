<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class ProfilesController extends Controller
{
    public function show(User $user) {
        return response($user);
    }

    public function posts(User $user) {
        return response($user->posts);
    }

    public function threads(User $user) {
        return response($user->threads);
    }

    /*
    public function messages(User $user) {
        
    }
    */
}
