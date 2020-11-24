<?php

use App\Http\Controllers\{
    ChatmessagesController,
    CategoriesController,
    ProfilesController,
    ThreadsController,
    PostsController,
    AuthController,
};
use App\Http\Controllers\Admin\UsersController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Setting;
use App\Models\Thread;
use App\Models\User;

// AuthController
Route::post('register', [AuthController::class, 'register']);
Route::get('logout', [AuthController::class, 'logout']);
Route::post('login', [AuthController::class, 'login']);

// ProfilesController
Route::bind('user', fn($value) => User::where('id', $value)->orWhere('username', $value)->firstOrFail());
// Route::get('user/{user}/messages', [ProfilesController::class, 'messages']);
Route::get('profile/{user}/threads', [ProfilesController::class, 'threads']);
Route::get('profile/{user}/posts', [ProfilesController::class, 'posts']);
Route::get('profile/{user}', [ProfilesController::class, 'show']);

// CategoriesController
Route::bind('category', fn($value) => Category::where('id', $value)->orWhere('name', $value)->firstOrFail());
Route::resource('categories', CategoriesController::class, ['except' => ['create', 'edit']]);

// ThreadsController
Route::bind('thread', fn($value) => Thread::where('id', $value)->orWhere('slug', $value)->orWhere('title', $value)->firstOrFail());
Route::resource('threads', ThreadsController::class, ['except' => ['create', 'edit', 'update']]);
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

// Route::get('search', function(Request $request) {
//     if (!$request->search) return abort(400);
//     $perPage = Setting::get('perPage', auth()->user());
//     switch ($request->resource) {
//         case 'users':
//             return response(User::search($request->search)->paginate($perPage));
//         case 'posts':
//             return response(App\Models\Post::search($request->search)->paginate($perPage));
//         case 'threads':
//             return response(App\Models\Thread::search($request->search)->paginate($perPage));
//         default:
//             return abort(400);
//     }
// });

Route::get('authenticate', function() {
    $user = auth()->user();
    return response()->json($user, $user ? 200 : 401);
});
