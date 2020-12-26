<?php

namespace App\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;
use App\Models\Thread;
use App\Models\Post;
use App\Models\User;

class PostPolicy
{
    /**
     * Determine whether the user can create models.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function create(User $user, Thread $thread)
    {
        if ($user->suspended()) return false;
        if ($user->getClearance() <= 3) return true;
        if ($thread->locked) return false;
        return true;
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\User  $user
     * @param  \App\Post  $post
     * @return mixed
     */
    public function update(User $user, Post $post, Thread $thread)
    {
        if ($user->suspended()) return false;
        if ($user->getClearance() <= 3) return true;
        if ($thread->locked) return false;
        if ($user->isAuthor($post)) return true;
        return false;
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\Post  $post
     * @return mixed
     */
    public function delete(User $user, Post $post)
    {
        if ($user->suspended()) return false;
        if ($user->getClearance() <= 2 || $user->isAuthor($post)) return true;
        return false;
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\User  $user
     * @param  \App\Post  $post
     * @return mixed
     */
    public function restore(User $user, Post $post)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\Post  $post
     * @return mixed
     */
    public function forceDelete(User $user, Post $post)
    {
        //
    }
    
    public function like(User $user, Post $post) {
        return !$user->isAuthor($post);
    }
}
