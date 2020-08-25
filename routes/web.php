<?php

use Illuminate\Support\Facades\Route;

// AuthController
Route::post('/authenticate', 'AuthController@authenticate')->name('authenticate');
Route::post('/register', 'AuthController@register')->name('register');
Route::post('/logout', 'AuthController@logout')->name('logout');
Route::post('/login', 'AuthController@login')->name('login');

// PostsController
Route::resource('posts', 'PostsController', ['except' => ['create', 'edit']]);
Route::post('/posts/{post}/like', 'PostsController@like');

// CommentsController
Route::resource('comments', 'CommentsController', ['except' => ['create', 'edit']]);
Route::post('/comments/{comment}/like', 'CommentsController@like');

// Admin -> UsersController
Route::namespace('Admin')->prefix('admin')->name('admin.')->middleware('IsOnline')->group(function() {
    Route::resource('/users', 'UsersController', ['except' => ['create', 'edit']]);
});

Route::post('/test', 'PostsController@updateTags');

// Load app.html (including React) on every single path
Route::view('/{path?}', 'app');