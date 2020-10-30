<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Thread;

class ThreadsController extends Controller
{
    public function index()
    {
        $threads = Thread::all();
        if (request()->query('tableData')) {
            $threads->load('threads.posts');
        }
        if ($id = request()->query('category', false)) {
            return response(Category::find($id)->threads);
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
