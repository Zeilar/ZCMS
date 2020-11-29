<?php

namespace App\Http\Controllers;

use App\Events\NewChatmessage;
use Illuminate\Http\Request;
use App\Models\Chatmessage;
use App\Models\User;

class ChatmessagesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->authorize('viewAny', Chatmessage::class);
        if ($id = request()->query('profile', false)) {
            $profile = User::where('id', $id)->orWhere('username', $id)->firstOrFail();
            return Chatmessage::where('receiver_id', $profile->id)
                ->where('user_id', auth()->user()->id)
                ->orderByDesc('id')
                ->limit(30)
                ->get();
        }
        return Chatmessage::orderByDesc('id')->limit(30)->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->authorize('create', $request->profile);

        $message = Chatmessage::create([
            'user_id' => auth()->user()->id,
            'content' => $request->content,
        ]);

        broadcast(new NewChatmessage($message));

        return response(true);
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