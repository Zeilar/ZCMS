<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\PostLike;
use App\Post;
use App\Tag;
use Auth;

class PostsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Post::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if (!Auth::check() || !auth()->user()->can('create', Post::class)) {
            return abort(403);
        }

        $request->validate([
            'title'   => 'required|string|min:3|max:100',
            'content' => 'required|string|min:3',
        ]);

        $post = Post::create([
            'title'   => $request->title,
            'content' => $request->content,
            'user_id' => auth()->user()->id ?? 1, // TODO: remove null coalescing
        ]);

        return response()->json(['message' => 'Post was successfully created.', 'post' => $post]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        return response()->json($post);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Post $post)
    {
        $user = auth()->user();
        if (empty($user) || !$user->can('update', $post)) {
            return abort(403);
        }

        $post->update([
            'title'     => $request->title,   
            'content'   => $request->content,
            'edited_by' => $user->username,
        ]);

        $validTags = [];
        $tags = explode(', ', $request->tags);
        foreach ($tags as $tag) {
            $tag = Tag::where('name', $tag)->first();
            if ($tag !== null) array_push($validTags, $tag->id);
        }
        $post->tags()->sync($validTags);
        $post->tags = $post->tags()->pluck('name');

        return response()->json([
            'message' => 'Post was successfully updated.',
            'post'    => $post,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        if (!Auth::check() || !auth()->user()->can('delete', $post)) {
            return abort(403);
        }

        $post_id = $post->id;
        $post->likes()->delete();
        $post->delete();

        return response()->json([
            'message' => 'Post was successfully deleted.',
            'post_id' => $post_id,
        ]);
    }

    public function like(Request $request, Post $post) {
        $user = auth()->user();
        if (empty($user) || !$user->can('like', $post)) {
            return abort(403);
        }
        
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