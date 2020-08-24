<?php

use Illuminate\Support\Facades\Route;

// AuthController
Route::post('/authenticate', 'AuthController@authenticate')->name('authenticate');
Route::post('/register', 'AuthController@register')->name('register');
Route::post('/logout', 'AuthController@logout')->name('logout');
Route::post('/login', 'AuthController@login')->name('login');

// PostsController
Route::resource('post', 'PostsController');

// Admin -> UsersController
Route::resource('/admin/users', 'Admin\UsersController');

// Load our app.html (including React) on every single path
Route::view('/{path?}', 'app');