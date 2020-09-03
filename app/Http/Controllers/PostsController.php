<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\PostLike;
use App\Post;
use Auth;

class PostsController extends Controller
{
    public function index()
    {
        $this->authorize('viewAny', Chatmessage::class);
        return response()->json(Post::all());
    }

    public function store(Request $request)
    {
        $this->authorize('create', Chatmessage::class);

        $request->validate([
            'title'   => 'required|string|min:3|max:100',
            'content' => 'required|string|min:3',
        ]);

        $post = Post::create([
            'title'   => $request->title,
            'content' => $request->content,
            'user_id' => auth()->user()->id ?? 1, // TODO: remove null coalescing
        ]);

        return response()->json([
            'message' => 'Post was successfully created.',
            'type'    => 'success',
            'post'    => $post,
        ]);
    }

    public function show(Post $post)
    {
        return response()->json($post);
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

        return response()->json([
            'message' => 'Post was successfully updated.',
            'type'    => 'success',
            'post'    => $post,
        ]);
    }

    public function destroy(Post $post)
    {
        $this->authorize('delete', $post);

        $post_id = $post->id;
        $post->likes()->delete();
        $post->delete();

        return response()->json([
            'message' => 'Post was successfully deleted.',
            'type'    => 'success',
            'post_id' => $post_id,
        ]);
    }

    public function like(Request $request, Post $post) {
        $this->authorize('like', $post);

        // Remove already existing like, or like it if it hasn't been already
        if ($postLike = $user->postLikes()->where('post_id', $post->id)->first()) {
            $postLike->delete();
            return response()->json(['likes' => $post->likes->count(), 'post_id' => $post->id]);
        } else {
            PostLike::create(['user_id' => $user->id, 'post_id' => $post->id]);
            return response()->json(['likes' => $post->likes->count(), 'post_id' => $post->id]);
        }
    }
}
