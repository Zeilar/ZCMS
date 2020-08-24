<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'title'   => 'required|string|min:3|max:100',
            'content' => 'required|string|min:3',
        ]);

        return response()->json(Post::create([
            'title'   => $request->title,
            'content' => $request->content,
            'user_id' => auth()->user()->id ?? 1, // TODO: remove null coalescing
        ]));
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
        // TODO: validation

        $post->update([
            'title'   => $request->title,   
            'content' => $request->content,
        ]);

        return response()->json(['post' => ['title' => $request->title, 'content' => $request->content]]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        // TODO: validation

        $post->delete();

        return response()->json([
            'message' => 'Post was successfully deleted.',
        ]);
    }
}