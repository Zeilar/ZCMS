<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Thread;

class ThreadsController extends Controller
{
    public function index()
    {
        if ($id = request()->query('category', false)) {
            $threads = Category::find($id)->threads;
            foreach ($threads as $thread) {
                $thread->posts = $thread->posts()->count();
                $thread->latestPost = $thread->latestPost()->load('user');
            }
        }
        return response($threads ?? Thread::all());
    }

    public function store(Request $request)
    {
        //
    }

    public function show(Thread $thread)
    {
        //
    }

    public function update(Request $request, Thread $thread)
    {
        //
    }

    public function destroy(Thread $thread)
    {
        //
    }
}
