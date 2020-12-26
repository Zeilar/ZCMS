<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Thread;
use App\Models\Post;
use App\Models\User;

class StatisticsController extends Controller
{
    public function amountOfUsers() {
        return response(User::count());
    }

    public function amountOfThreads() {
        return response(Thread::count());
    }

    public function amountOfPosts() {
        return response(Post::count());
    }
}
