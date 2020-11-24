<?php

namespace Tests\Feature;

use App\Models\User;
use Tests\TestCase;
use Auth;

class ViewProfileTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testExample()
    {   
        $user = User::inRandomOrder()->limit(1)->firstOrFail();

        $response = $this->get("/api/profile/$user->id");
        $response->assertStatus(200);

        $response = $this->get("/api/profile/$user->id/threads");
        $response->assertStatus(200);

        $response = $this->get("/api/profile/$user->id/posts");
        $response->assertStatus(200);

        Auth::loginUsingId(1);
        $response = $this->get("/api/profile/$user->id");
        $response->assertStatus(200);

        $response = $this->get("/api/profile/$user->id/threads");
        $response->assertStatus(200);

        $response = $this->get("/api/profile/$user->id/posts");
        $response->assertStatus(200);
    }
}
