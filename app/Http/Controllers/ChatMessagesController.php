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
            $user = auth()->user();
            return Chatmessage::where(function($q) use ($profile, $user) {
                $q->where('receiver_id', $profile->id)->where('user_id', $user->id);
            })
            ->orWhere(function($q) use ($profile, $user) {
                $q->where('receiver_id', $user->id)->where('user_id', $profile->id);
            })
            ->orderByDesc('id')
            ->limit(30)
            ->get();
        }
        return abort(400);
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