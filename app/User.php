<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Notifications\Notifiable;
use \Carbon\Carbon;

class User extends Authenticatable
{
    use Notifiable; 

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username', 'email', 'password', 'role',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'email_verified_at',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function posts() {
        return $this->hasMany(Post::class);
    }

    public function threads() {
        return $this->hasMany(Thread::class);
    }

    public function postLikes() {
        return $this->hasMany(PostLike::class);
    }

    public function roles() {
        return $this->belongsToMany(Role::class);
    }

    public function isAuthor(Post $post): bool {
        return $this->id === $post->user->id;
    }

    public function isOp(Thread $thread): bool {
        return $this->id === $thread->user->id;
    }

    public function hasRole(string ...$roles): bool {
        return $this->roles()->whereIn('name', $roles)->first() ? true : false;
    }

    public function hasRoles(array $roles): bool {
        foreach ($roles as $role) {
            if ($this->roles()->where('name', $role)->get()->count() <= 0) {
                return false;
            }
        }
        return true;
    }

    public function hasAnyRole(array $roles): bool {
        if ($this->roles()->whereIn('name', $roles)->first() !== null) {
            return true;
        }
        return false;
    }

    public function publicData(): array {
        return [
            'username' => $this->username,
            'email'    => $this->email,
            'roles'    => $this->roles()->pluck('name'),
        ];
    }

    public function chatmessages() {
        return $this->hasMany(Chatmessage::class);
    }

    public function suspensions() {
        return $this->hasMany(Suspension::class);
    }

    public function suspended() {
        return $this->suspensions()->where('expiration', '>=', Carbon::now())->first() ? true : false;
    }

    public function suspend(string $message, $expiration) {
        $suspension = Suspension::create([
            'expiration' => $expiration ?? Carbon::now(),
            'message' => $message ?? null,
            'user_id' => $this->id,
        ]);
        return $suspension;
    }
    
    public function highestRole() {
        return $this->roles()->orderBy('clearance')->first();
    }

    public function higherClearance(User $user): bool {
        // Clearances are ordered from 1 and up, with the highest rank being 1
        return $this->hasRole('superadmin') || $this->highestRole()->clearance < $user->highestRole()->clearance;
    }
}