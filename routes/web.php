<?php

use Illuminate\Support\Facades\Route;

Route::prefix('api')->group(function() {
    // AuthController
    Route::post('/authenticate', 'AuthController@authenticate');
    Route::post('/register', 'AuthController@register');
    Route::post('/logout', 'AuthController@logout');
    Route::post('/login', 'AuthController@login');

    // PostsController
    Route::resource('posts', 'PostsController', ['except' => ['create', 'edit']]);
    Route::post('/posts/{post}/like', 'PostsController@like');

    // CommentsController
    Route::resource('comments', 'CommentsController', ['except' => ['create', 'edit']]);
    Route::post('/comments/{comment}/like', 'CommentsController@like');

    // Admin -> UsersController
    Route::namespace('Admin')->prefix('admin')->middleware('IsOnline')->group(function() {
        Route::resource('/users', 'UsersController', ['except' => ['create', 'edit']]);
    });
});

// Load app.html (including React) on every single path
Route::view('/{path?}', 'app');