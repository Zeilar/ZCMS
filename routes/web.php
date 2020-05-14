<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function() {
    // App\User::create([
    //     'username' => 'test',
    //     'email' => 'test@test.com',
    //     'password' => Illuminate\Support\Facades\Hash::make('123'),
    // ]);
    return 'Hello'; 
});

Route::post('/login', 'AuthController@login')->name('login');

Route::post('/ping', 'PingController@ping')->name('ping');