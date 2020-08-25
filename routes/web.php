<?php

use Illuminate\Support\Facades\Route;

// AuthController
Route::post('/authenticate', 'AuthController@authenticate')->name('authenticate');
Route::post('/register', 'AuthController@register')->name('register');
Route::post('/logout', 'AuthController@logout')->name('logout');
Route::post('/login', 'AuthController@login')->name('login');

// PostsController
Route::resource('post', 'PostsController', ['except' => ['create', 'edit']]);
Route::patch('/post/{post}/like', 'PostsController@like');

// Admin -> UsersController
Route::namespace('Admin')->prefix('admin')->name('admin.')->group(function() {
    Route::resource('/users', 'UsersController', ['except' => ['create', 'edit']]);
});

// Load app.html (including React) on every single path
Route::view('/{path?}', 'app');