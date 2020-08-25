<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\CommentLike;
use App\Comment;
use Auth;

class CommentsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Comment::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if (Auth::check() && !auth()->user()->can('create', Comment::class)) {
            return abort(403);
        }

        $request->validate(['content' => 'required|string|min:3']);

        $comment = Comment::create([
            'title'   => $request->title,
            'content' => $request->content,
            'user_id' => auth()->user()->id ?? 1, // TODO: remove null coalescing
        ]);

        return response()->json(['message' => 'Comment was successfully created.', 'comment' => $comment]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function show(Comment $comment)
    {
        return response()->json($comment);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Comment $comment)
    {
        if (Auth::check() && !auth()->user()->can('update', $comment)) {
            return abort(403);
        }

        $comment->update([
            'title'     => $request->title,   
            'content'   => $request->content,
            'edited_by' => auth()->user()->username,
        ]);

        return response()->json([
            'message' => 'Comment was successfully updated.',
            'comment'    => $comment,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Comment $comment)
    {
        if (Auth::check() && !auth()->user()->can('delete', $comment)) {
            return abort(403);
        }

        $comment_id = $comment->id;
        $comment->delete();

        return response()->json([
            'message' => 'Comment was successfully deleted.',
            'comment_id' => $comment_id,
        ]);
    }

    public function like(Request $request, Comment $comment) {
        $user = auth()->user();
        if (!$user->can('like', $comment)) {
            return abort(403);
        }
        
        // Remove already existing like, or like it if it hasn't been already
        if ($commentLike = $user->commentLikes()->where('comment_id', $comment->id)->first()) {
            $commentLike->delete();
            return response()->json(['likes' => $comment->likes->count(), 'comment_id' => $comment->id]);
        } else {
            CommentLike::create(['user_id' => $user->id, 'comment_id' => $comment->id]);
            return response()->json(['likes' => $comment->likes->count(), 'comment_id' => $comment->id]);
        }
    }
}