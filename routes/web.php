<?php

use Illuminate\Support\Facades\Route;

Route::post('/authenticate', 'AuthController@authenticate')->name('authenticate');
Route::post('/logout', 'AuthController@logout')->name('logout');
Route::post('/login', 'AuthController@login')->name('login'); 

// Load our app.html (including React) on every single path
Route::view('/{path?}', 'app');