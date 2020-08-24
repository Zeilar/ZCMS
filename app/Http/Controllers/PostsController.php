<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;

class PostsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (!auth()->user()->can('viewAny', Post::class)) {
            return abort(401);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if (!auth()->user()->can('create', Post::class)) {
            return abort(401);
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
        if (!auth()->user()->can('view', $post)) {
            return abort(401);
        }
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
        if (!auth()->user()->can('update', $post)) {
            return abort(401);
        }

        $post->update([
            'title'     => $request->title,   
            'content'   => $request->content,
            'edited_by' => auth()->user()->username,
        ]);

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
        if (!auth()->user()->can('delete', $post)) {
            return abort(401);
        }

        $post_id = $post->id;
        $post->delete();

        return response()->json([
            'message' => 'Post was successfully deleted.',
            'post_id' => $post_id,
        ]);
    }
}