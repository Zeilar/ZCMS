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
            $posts = $thread->posts()->paginate(Post::$MAX_PER_PAGE);
        } else {
            $posts = Post::paginate(Post::$MAX_PER_PAGE);
        }
        if ($id = request()->query('getAuthor', false)) {
            $posts->load('user');

            if ($id = request()->query('getAuthorPostsAmount', false)) {
                foreach ($posts as $post) {
                    $user = $post->user;
                    $user->postsAmount = $user->posts()->count();
                }
            }
        }
        return response($posts);
    }

    public function store(Request $request)
    {
        $this->authorize('create', Post::class);

        $request->validate([
            'title'   => 'required|string|min:3|max:100',
            'content' => 'required|string|min:3',
        ]);

        $post = Post::create([
            'title'   => $request->title,
            'content' => $request->content,
            'user_id' => auth()->user()->id,
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

    public function like(Request $request, Post $post) {
        $this->authorize('like', $post);

        $user = auth()->user();

        // Remove already existing like, or like it if it hasn't been already
        if ($postLike = $user->postLikes()->where('post_id', $post->id)->firstOrFail()) { // ->find() maybe?
            $postLike->delete();
            return response(true);
        } else {
            Postlike::create(['user_id' => $user->id, 'post_id' => $post->id]);
            return response(true);
        }
    }
}
