<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Role;
use App\Models\User;
use \Carbon\Carbon;

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
        return response(User::all());
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

        $roles = [];
        foreach (JSON_decode($request->roles) as $role) {
            $role = Role::where('name', $role->value)->first();
            if (empty($role)) return abort(400);
            array_push($roles, $role->id);
        }

        $request->validate([
            'username'              => 'required|string|unique:users',
            'email'                 => 'required|string|email|unique:users',
            'password'              => 'required|string|confirmed',
            'password_confirmation' => 'required|string',
        ]);
        
        $user = User::create([
            'username' => $request->username,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
        ]);
        if (count($roles) > 0) $user->roles()->sync($roles);

        return response($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $this->authorize('update', $user);

        $roles = [];
        if ($request->roles) {
            foreach (JSON_decode($request->roles) as $role) {
                $role = Role::where('name', $role->value)->first();
                $this->authorize('giveRole', $role);
                if (empty($role)) return abort(400);
                array_push($roles, $role->id);
            }
        }

        $user->update([
            'username' => $request->username ?? $user->username,
            'email'    => $request->email ?? $user->email,
        ]);
        if (count($roles) > 0) $user->roles()->sync($roles);

        return response($user);
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

        $deletedUser = $user;
        $user->delete();

        return response($deletedUser);
    }

    public function suspend(Request $request, User $user) {
        $this->authorize('suspend', $user);
        $user->suspend($request->message, Carbon::now()->addDays($request->days ?? 7));
        return response($user);
    }

    public function pardon(User $user) {
        $this->authorize('pardon', $user);
        $user->suspensions()->where('expiration', '>=', Carbon::now())->update(['expiration' => Carbon::now()->subMinutes(1)]);
        return response($user);
    }

    public function bulkDelete(Request $request) {
        $usersToDelete = [];
        foreach (json_decode($request->users) as $user) {
            $user = User::findOrFail($user);
            $this->authorize('delete', $user);
            array_push($usersToDelete, $user);
        }
        foreach ($usersToDelete as $user) {
            $user->delete();
        }
        return response($usersToDelete);
    }
}
