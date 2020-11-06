<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Models\{
    Chatmessage,
    Category,
    Thread,
    User,
    Post,
    Role
};

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        Chatmessage::class => \App\Policies\ChatmessagePolicy::class,
        Category::class    => \App\Policies\CategoryPolicy::class,
        Thread::class      => \App\Policies\ThreadPolicy::class,
        User::class        => \App\Policies\UserPolicy::class,
        Post::class        => \App\Policies\PostPolicy::class,
        Role::class        => \App\Policies\RolePolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();
    }
}
