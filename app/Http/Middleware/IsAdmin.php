<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Closure;

class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $user = auth()->user();
        if (!$user) return abort(401);
        if (!$user->getClearance() <= 2) return abort(403);
        return $next($request);
    }
}
