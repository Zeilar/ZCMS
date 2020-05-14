<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Auth;

class AuthController extends Controller
{
    public function login() {
        $id = request('id');
        $fieldType = filter_var($id, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';
        request()->merge([$fieldType => $id]);

        $user = User::where($fieldType, request('id'))->get();
        if (!$user->count()) return response()->json(['user does not exist']);

        if (Auth::attempt([$fieldType => $id, 'password' => request('password')])) {
            return response()->json([
                'message' => 'Successfully logged in!',
                'id' => $user->first()->id,
            ]);
        }
        if (User::where($fieldType, request('id'))->count()) return response()->json(['incorrect password']);

        return response()->json([$user]);
    }
}