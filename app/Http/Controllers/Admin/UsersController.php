<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use \Carbon\Carbon;
use App\User;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->authorize('viewAny', User::class);
        return view('admin.users');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->authorize('create', User::class);
        
        $user = User::create([
            'username' => $request->username,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'message' => 'Successfully created user.',
            'user'    => $user,
            'type'    => 'success',
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $this->authorize('update', $user);

        return response()->json([
            'message' => 'Successfully updated user.',
            'user'    => $user,
            'type'    => 'success',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $this->authorize('delete', $user);

        $user->chatmessages()->delete();
        $user->postLikes()->delete();
        $user->threads()->delete();
        $user->roles()->delete();
        $user->posts()->delete();
        $user->delete();

        return response()->json(User::all());
    }

    public function all() {
        $this->authorize('viewAny', User::class);
        return response()->json(User::all());
    }

    public function suspend(Request $request, User $user) {
        $this->authorize('suspend', $user);
        // TODO: suspend user
    }

    public function pardon(User $user) {
        $this->authorize('pardon', $user);
        $user->suspensions()->where('expiration', '>=', Carbon::now())->update(['expiration' => Carbon::now()]);
        return response(true);
    }
}