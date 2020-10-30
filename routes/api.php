<?php

use App\Http\Controllers\{
    ChatmessagesController,
    CategoriesController,
    ThreadsController,
    PostsController,
    AuthController,
};
use App\Http\Controllers\Admin\UsersController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

// AuthController
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::post('/login', [AuthController::class, 'login']);

// ThreadsController
Route::resource('threads', ThreadsController::class, ['except' => ['create', 'edit']]);

// CategoriesController
Route::get('categories', [CategoriesController::class, 'index']);

// PostsController
Route::post('/posts/{comment}/like', [PostsController::class, 'like']);
Route::resource('posts', PostsController::class, ['except' => ['create', 'edit']]);

// ChatmessagesController
Route::resource('chatmessages', ChatmessagesController::class, ['except' => ['create', 'edit', 'show']]);

// Admin -> UsersController
Route::prefix('admin')->middleware('isAdmin')->group(function() {
    Route::prefix('users')->group(function() {
        Route::resource('/', UsersController::class, ['except' => ['create', 'edit', 'show']])->parameters(['' => 'user']);
        Route::delete('/', [UsersController::class, 'bulkDelete']);
        Route::post('{user}/suspend', [UsersController::class, 'suspend']);
        Route::post('{user}/pardon', [UsersController::class, 'pardon']);
    });
});

Route::get('authenticate', function() {
    $user = auth()->user();
    return response($user, $user ? 200 : 401);
});
