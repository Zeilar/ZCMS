<?php

use Illuminate\Support\Facades\Route;

// Load our app.html (including React) on every single path
Route::view('/{path?}', 'app');

Route::middleware(['throttle:5,1'])->group(function() {
    Route::post('/login', 'AuthController@login')->name('login'); 
});
Route::post('/authenticate', 'AuthController@authenticate')->name('authenticate');