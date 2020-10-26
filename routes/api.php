<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

// AuthController
Route::post('/register', 'AuthController@register')->name('register.submit');
Route::post('/login', 'AuthController@login')->name('login.submit');
Route::post('/logout', 'AuthController@logout')->name('logout');

// ThreadsController
Route::resource('threads', 'ThreadsController', ['except' => ['create', 'edit']]);

// PostsController
Route::resource('posts', 'PostsController', ['except' => ['create', 'edit']]);
Route::post('/Posts/{comment}/like', 'PostsController@like');

// ChatmessagesController
Route::resource('chatmessages', 'ChatmessagesController', ['except' => ['create', 'edit', 'show']]);

// Admin -> UsersController
Route::namespace('Admin')->prefix('admin')->middleware('Authorize')->group(function() {
    Route::resource('/users', 'UsersController', ['except' => ['create', 'edit', 'show']]);
    Route::delete('/users/bulk/delete', 'UsersController@bulkDelete');
    Route::get('/', 'DashboardController@index')->name('admin.index');
    Route::post('/users/{user}/suspend', 'UsersController@suspend');
    Route::post('/users/{user}/pardon', 'UsersController@pardon');
    Route::get('/users/all', 'UsersController@all');
});
