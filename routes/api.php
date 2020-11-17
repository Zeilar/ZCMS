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
use App\Models\Category;
use App\Models\Thread;

// AuthController
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::post('/login', [AuthController::class, 'login']);

// CategoriesController
Route::bind('category', fn($value) => Category::where('id', $value)->orWhere('name', $value)->firstOrFail());
Route::resource('categories', CategoriesController::class, ['except' => ['create', 'edit']]);

// ThreadsController
Route::bind('thread', fn($value) => Thread::where('id', $value)->orWhere('slug', $value)->orWhere('title', $value)->firstOrFail());
Route::resource('threads', ThreadsController::class, ['except' => ['create', 'edit']]);
Route::post('threads/{thread}', [ThreadsController::class, 'update']);

// PostsController
Route::resource('posts', PostsController::class, ['except' => ['create', 'edit', 'update']]);
Route::put('/posts/{post}/toggleLike', [PostsController::class, 'toggleLike']);
Route::post('posts/{post}', [PostsController::class, 'update']);

// ChatmessagesController
Route::resource('chatmessages', ChatmessagesController::class, ['except' => ['create', 'edit', 'show']]);

// Admin -> UsersController
Route::prefix('admin')->middleware('IsAdmin')->group(function() {
    Route::prefix('users')->group(function() {
        Route::resource('/', UsersController::class, ['except' => ['create', 'edit', 'show']])->parameters(['' => 'user']);
        Route::delete('/', [UsersController::class, 'bulkDelete']);
        Route::post('{user}/suspend', [UsersController::class, 'suspend']);
        Route::post('{user}/pardon', [UsersController::class, 'pardon']);
    });
});

Route::get('users/{id}', function($id) {
    return App\Models\User::where('id', $id)->orWhere('username', $id)->firstOrFail();
});

Route::get('authenticate', function() {
    $user = auth()->user();
    return response()->json($user, $user ? 200 : 401);
});
