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
            $threads = Category::where('name', $id)->orWhere('id', $id)->first()->threads()->paginate(Thread::$MAX_PER_PAGE);
            foreach ($threads as $thread) {
                $thread->postsAmount = $thread->posts()->count();
                $thread->latestPost = $thread->latestPost()->load('user');
                $thread->op = $thread->op();
            }
        } else {
            $threads = Thread::paginate(Thread::$MAX_PER_PAGE);
        }
        return response($threads);
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
