<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Auth;

class AuthController extends Controller
{
    public function login()
    {
        $id = request('id'); // Email or username - we don't know yet

        // Determine whether $id is an email or username and change it accordingly
        $fieldType = filter_var($id, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';
        request()->merge([$fieldType => $id]);
        
        // Attempt to log in
        if (Auth::attempt([$fieldType => $id, 'password' => request('password')])) {
            return response()->json(['message' => 'Successfully logged in!']);
        }

        // Check if user exists
        if (empty(User::where($fieldType, $id)->first())) {
            return response()->json(['error' => true, 'message' => 'User does not exist']);
        }

        // If the user does exist, it means the password was incorrect
        if (User::where($fieldType, $id)->count()) {
            return response()->json(['error' => true, 'message' => 'Incorrect password']);
        }

        // If none of the above executes, something has gone wrong
        return response()->json(['error' => true, 'message' => 'Something went wrong, please try again']);
    }

    public function register(Request $request) {
        $request->validate([
            'username' => 'required|string|unique:users|min:5|max:15',
            'email'    => 'required|string|email|unique:users',
            'password' => 'required|string|min:5',
        ]);
    }

    public function authenticate(Request $request) {
        $user = auth()->user();
        return response()->json(['user' => isset($user) ? ['username' => $user->username, 'email' => $user->email] : null]);
    }
}