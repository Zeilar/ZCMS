<?php

namespace Tests\Feature;

use App\Models\Thread;
use Tests\TestCase;
use Auth;

class ViewThreadsTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testExample()
    {
        $thread = Thread::inRandomOrder()->limit(1)->firstOrFail();

        $response = $this->get('/api/threads');
        $response->assertStatus(200);

        $response = $this->get("/api/threads/$thread->id");
        $response->assertStatus(200);

        Auth::loginUsingId(1);
        
        $response = $this->get('/api/threads');
        $response->assertStatus(200);
        
        $response = $this->get("/api/threads/$thread->id");
        $response->assertStatus(200);
    }
}
