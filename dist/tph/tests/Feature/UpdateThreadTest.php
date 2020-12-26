<?php

namespace Tests\Feature;

use App\Models\Thread;
use Tests\TestCase;
use Auth;

class UpdateThreadTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testExample()
    {
        $thread = Thread::inRandomOrder()->limit(1)->firstOrFail();

        Auth::loginUsingId(4);

        $response = $this->json('POST', "/api/threads/$thread->id", ['locked' => 1]);
        $response->assertStatus(403);

        $response = $this->json('DELETE', "/api/threads/$thread->id");
        $response->assertStatus(403);

        Auth::loginUsingId(1);

        $response = $this->json('POST', "/api/threads/$thread->id");
        $response->assertStatus(422);

        $response = $this->json('POST', "/api/threads/$thread->id", ['title' => 'Test title', 'locked' => 1]);
        $response->assertStatus(200);

        $response = $this->json('DELETE', "/api/threads/$thread->id");
        $response->assertStatus(200);
    }
}
