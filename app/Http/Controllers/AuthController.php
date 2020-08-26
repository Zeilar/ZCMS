<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\User;
use App\Role;
use Auth;

class AuthController extends Controller
{
    public function login()
    {
        if (Auth::check()) return response()->json(['error' => true, 'message' => 'You are already logged in.']);

        $id = request('id'); // Email or username - we don't know yet

        // Determine whether $id is an email or username and change it accordingly
        $fieldType = filter_var($id, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';
        request()->merge([$fieldType => $id]);
        
        // Attempt to log in
        if (Auth::attempt([$fieldType => $id, 'password' => request('password')])) {
            return response()->json(['error' => false, 'message' => 'Successfully logged in!', 'user' => auth()->user()->publicData()]);
        }

        // Check if user exists
        if (empty(User::where($fieldType, $id)->first())) {
            return response()->json(['error' => true, 'message' => 'User does not exist.']);
        }

        // If the user does exist, it means the password was incorrect
        if (User::where($fieldType, $id)->count()) {
            return response()->json(['error' => true, 'message' => 'Incorrect password.']);
        }

        // If none of the above executes, something has gone wrong
        return response()->json(['error' => true, 'message' => 'Something went wrong, please try again.']);
    }

    public function register(Request $request) {
        if (Auth::check()) return response()->json(['error' => true, 'message' => 'Please log out and try again.']);

        $request->validate([
            'username'              => 'required|string|unique:users|min:5|max:15',
            'email'                 => 'required|string|email|unique:users',
            'password'              => 'required|string|confirmed|min:5|max:30',
            'password_confirmation' => 'required|string|min:5|max:30',
        ]);

        $user = User::create([
            'username' => $request->username,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
        ]);
        $user->roles()->attach(Role::where('name', 'user')->first());

        Auth::attempt(['username' => $user->username, 'password' => $user->password]);

        return response()->json([
            'error'   => false,
            'message' => 'Your account was successfully created.',
            'user'    => $user->publicData()
        ]);
    }

    public function logout() {
        if (!Auth::check()) return response()->json(['error' => true, 'message' => 'You are already logged out.']);
        Auth::logout();
        return response()->json(['error' => false, 'message' => 'You have been successfully logged out.']);
    }

    public function authenticate(Request $request) {
        if (!Auth::check()) return abort(401);
        return response()->json(['user' => auth()->user()->publicData()]);
    }
}