<?php

namespace App\Http\Controllers;

use App\Events\NewChatmessage;
use Illuminate\Http\Request;
use App\Chatmessage;
use Auth;

class ChatmessagesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $this->authorize('viewAny', Chatmessage::class);
        return Chatmessage::orderByDesc('id')->limit(Chatmessage::$MAX_PER_PAGE)->with('user.roles')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->authorize('create', Chatmessage::class);

        $message = Chatmessage::create([
            'user_id' => auth()->user()->id,
            'content' => $request->content,
        ]);
        $message->user = $message->user;

        broadcast(new NewChatmessage($message));

        return response()->json($message);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Chatmessage  $chatmessage
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Chatmessage $chatmessage)
    {
        $this->authorize('update', $chatmessage);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Chatmessage  $chatmessage
     * @return \Illuminate\Http\Response
     */
    public function destroy(Chatmessage $chatmessage)
    {
        $this->authorize('delete', $chatmessage);
    }
}