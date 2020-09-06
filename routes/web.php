<?php

use Illuminate\Support\Facades\Route;

Route::middleware('CheckLocale')->group(function() {
    // AuthController
    Route::post('/register', 'AuthController@register')->name('register.submit');
    Route::post('/login', 'AuthController@login')->name('login.submit');
    Route::get('/logout', 'AuthController@logout')->name('logout');
    Route::view('/register', 'register')->name('register.form');
    Route::view('/login', 'login')->name('login.form');

    // ThreadsController
    Route::resource('threads', 'ThreadsController', ['except' => ['create']]);

    // PostsController
    Route::resource('posts', 'PostsController', ['except' => ['create', 'edit']]);
    Route::post('/Posts/{comment}/like', 'PostsController@like');

    // ChatmessagesController
    Route::resource('chatmessages', 'ChatmessagesController', ['except' => ['create', 'edit', 'show']]);

    // Admin -> UsersController
    Route::namespace('Admin')->prefix('admin')->middleware('IsOnline')->group(function() {
        Route::resource('/users', 'UsersController', ['except' => ['create', 'edit', 'show']]);
        Route::get('/', 'DashboardController@index')->name('admin.index');
        Route::post('/users/{user}/pardon', 'UsersController@pardon');
        Route::get('/users/all', 'UsersController@all');
    });

    Route::get('/language/{language}', function($language) {
        if (!App\Language::all()->contains($language)) {
            return abort(400);
        }
        session()->put('locale', $language);
        return redirect()->back();
    });

    Route::post('/api/languages', function() {
        return response()->json(App\Language::all()->pluck('name'));
    });

    Route::get('/', function() {
        return view('home', ['categories' => App\Category::all()]);
    })->name('index');

    Route::post('/authenticate', function() {
        $user = auth()->user();
        if (empty($user)) return false;
        $user->roles = $user->roles()->pluck('name');
        return response()->json(auth()->user());
    });
});