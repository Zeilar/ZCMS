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
    Route::resource('threads', 'ThreadsController', ['except' => ['create', 'edit']]);

    // PostsController
    Route::resource('posts', 'PostsController', ['except' => ['create', 'edit']]);
    Route::post('/Posts/{comment}/like', 'PostsController@like');

    // ChatmessagesController
    Route::resource('chatmessages', 'ChatmessagesController', ['except' => ['create', 'edit', 'show']]);

    // Admin -> UsersController
    Route::namespace('Admin')->prefix('admin')->middleware('IsOnline')->group(function() {
        Route::resource('/users', 'UsersController', ['except' => ['create', 'edit', 'show']]);
        Route::delete('/users/bulk/delete', 'UsersController@bulkDelete');
        Route::get('/', 'DashboardController@index')->name('admin.index');
        Route::post('/users/{user}/suspend', 'UsersController@suspend');
        Route::post('/users/{user}/pardon', 'UsersController@pardon');
        Route::get('/users/all', 'UsersController@all');
    });

    Route::get('/language/{language}', function($language) {
        if (empty(App\Language::where('name', $language)->first())) {
            return abort(400);
        }
        session()->put('locale', $language);
        return redirect()->back();
    });

    Route::get('/', function() {
        return view('home', ['categories' => App\Category::all()]);
    })->name('index');
});

// API routes used for frontend
Route::prefix('api')->group(function() {
    Route::post('/authenticate', function() {
        $user = auth()->user();
        if (empty($user)) return false;
        return response()->json(auth()->user());
    });

    Route::middleware('CheckLocale')->group(function() {
        Route::get('/translations', 'LanguagesController@getTranslations');
        Route::post('/languages', 'LanguagesController@getLanguages');
    });
});