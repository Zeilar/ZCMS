<?php

namespace App\Events;

use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Models\Rank;
use App\Models\Role;

class CreatedUser
{
    use Dispatchable, SerializesModels;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($user)
    {
        // Add rank and role unless somehow the user already has one
        $user->ranks()->syncWithoutDetaching([Rank::where('name', 'pioneer')->first()->id]);
        $user->roles()->syncWithoutDetaching([Role::where('name', 'member')->first()->id]);
    }
}
