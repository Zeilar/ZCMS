<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Postlike;
use App\Models\Thread;
use App\Models\Post;

class PostsController extends Controller
{
    public function index()
    {
        if ($id = request()->query('thread', false)) {
            $thread = Thread::where('id', $id)->orWhere('slug', $id)->orWhere('title', $id)->firstOrFail();
            $posts = $thread->posts()->with('postlikes')->paginate(Post::$MAX_PER_PAGE);
        } else {
            $posts = Post::paginate(Post::$MAX_PER_PAGE);
        }
        if ($id = request()->query('getPostMeta', false)) {
            $posts->load('user');
            foreach ($posts as $post) {
                $user = $post->user;
                $user->postsAmount = $user->posts()->count();
                $user->likesAmount = $user->likedPosts();
            }
        }
        return response($posts);
    }

    public function store(Request $request)
    {
        $thread = Thread::findOrFail($request->threadId);
        $this->authorize('create', Post::class);

        $request->validate([
            'content' => 'required|string|min:3|max:500',
        ]);

        Post::create([
            'content'   => $request->content,
            'user_id'   => auth()->user()->id,
            'thread_id' => $thread->id,
        ]);

        return response(true);
    }

    public function show(Post $post)
    {
        return response($post);
    }

    public function update(Request $request, Post $post)
    {
        $this->authorize('update', $post);

        $user = auth()->user();
        $post->update([
            'title'     => $request->title,
            'content'   => $request->content,
            'edited_by' => $user->username,
        ]);

        /*
        $validTags = [];
        $tags = explode(', ', $request->tags);
        foreach ($tags as $tag) {
            $tag = Tag::where('name', $tag)->first();
            if ($tag !== null) array_push($validTags, $tag->id);
        }
        $post->tags()->sync($validTags);
        $post->tags = $post->tags()->pluck('name');
        */

        return response(true);
    }

    public function destroy(Post $post)
    {
        $this->authorize('delete', $post);
        $post->delete();
        return response(true);
    }

    public function toggleLike(Post $post) {
        $this->authorize('toggleLike', Post::class);

        $user = auth()->user();

        if ($postLike = $user->postLikes()->where('post_id', $post->id)->first()) {
            $postLike->delete();
            return response(true);
        } else {
            Postlike::create(['user_id' => $user->id, 'post_id' => $post->id]);
            return response(true);
        }
    }
}
