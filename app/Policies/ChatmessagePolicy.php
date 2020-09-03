<?php

namespace App\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;
use App\Chatmessage;
use App\User;
use Auth;

class ChatmessagePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\User  $user
     * @param  \App\Chatmessage  $chatmessage
     * @return mixed
     */
    public function view(User $user, Chatmessage $chatmessage)
    {
        return true;
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        if ($user->suspended()) return false;
        return Auth::check();
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\User  $user
     * @param  \App\Chatmessage  $chatmessage
     * @return mixed
     */
    public function update(User $user, Chatmessage $chatmessage)
    {
        if ($user->suspended()) return false;
        return $user->hasRole('admin');
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\Chatmessage  $chatmessage
     * @return mixed
     */
    public function delete(User $user, Chatmessage $chatmessage)
    {
        if ($user->suspended()) return false;
        return $user->hasRole('admin', 'moderator') || $chatmessage->user->id === $user->id;
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\User  $user
     * @param  \App\Chatmessage  $chatmessage
     * @return mixed
     */
    public function restore(User $user, Chatmessage $chatmessage)
    {
        if ($user->suspended()) return false;
        return $user->hasRole('admin');
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\Chatmessage  $chatmessage
     * @return mixed
     */
    public function forceDelete(User $user, Chatmessage $chatmessage)
    {
        if ($user->suspended()) return false;
        $user->hasRole('admin');
    }
}