<?php

use App\Http\Controllers\ChatmessagesController;
use App\Http\Controllers\Admin\UsersController;
use App\Http\Controllers\ThreadsController;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

// AuthController
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::post('/login', [AuthController::class, 'login']);

// ThreadsController
Route::resource('threads', ThreadsController::class, ['except' => ['create', 'edit']]);

// PostsController
Route::post('/Posts/{comment}/like', [PostsController::class, 'like']);
Route::resource('posts', PostsController::class, ['except' => ['create', 'edit']]);

// ChatmessagesController
Route::resource('chatmessages', ChatmessagesController::class, ['except' => ['create', 'edit', 'show']]);

// Admin -> UsersController
Route::prefix('admin')->group(function() {
    Route::resource('/users', UsersController::class, ['except' => ['create', 'edit', 'show']]);
    Route::delete('/users/bulk/delete', [UsersController::class, 'bulkDelete']);
    Route::post('/users/{user}/suspend', [UsersController::class, 'suspend']);
    Route::post('/users/{user}/pardon', [UsersController::class, 'pardon']);
    Route::get('/users', [UsersController::class, 'index']);
});

Route::get('authenticate', function() {
    $user = auth()->user();
    return response($user, $user ? 200 : 401);
});
