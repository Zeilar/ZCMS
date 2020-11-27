<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Setting;
use App\Models\Thread;
use App\Models\Post;

class ThreadsController extends Controller
{
    protected function perPage() {
        return Setting::get('perPage', auth()->user());
    }
    
    public function index()
    {
        $threads = Thread::orderByDesc('id')->paginate($this->perPage());
        if ($id = request()->query('category', false)) {
            $threads = Category::where('name', $id)->orWhere('id', $id)->firstOrFail()->threads()->orderByDesc('id')->paginate($this->perPage());
        }
        return response($threads);
    }

    public function store(Request $request)
    {
        $this->authorize('create', Thread::class);
        $request->validate([
            'content' => 'required|string|min:3|max:1000',
            'title'   => 'required|string|min:3|max:150',
        ]);
        $thread = Thread::factory([
            'category_id' => Category::where('name', $request->category)->firstOrFail()->id,
            'user_id'     => auth()->user()->id,
            'title'       => $request->title,
        ])->create();
        Post::create([
            'content'   => $request->content,
            'user_id'   => auth()->user()->id,
            'thread_id' => $thread->id,
        ]);
        return response($thread);
    }

    public function show(Thread $thread)
    {
        if (request()->query('getCategory', false)) {
            $thread->load('category');
        }
        return response($thread);
    }

    public function update(Request $request, Thread $thread)
    {
        $this->authorize('update', $thread);
        $data = [];
        if (isset($request->locked)) {
            $this->authorize('lock', $thread);
            $data['locked'] = $request->locked;
        }
        $data['title'] = $request->title;
        $request->validate(['title' => 'required|string|min:3|max:150']);
        $thread->update($data);
        return response($thread);
    }

    public function destroy(Thread $thread)
    {
        $this->authorize('delete', $thread);
        $category = $thread->category;
        $thread->delete();
        return response($category);
    }
}
