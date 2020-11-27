<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Thread;
use Tests\TestCase;
use Auth;

class ThreadCrudTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testExample()
    {
        $category = Category::inRandomOrder()->limit(1)->firstOrFail();

        $response = $this->json('POST', '/api/threads', ['category' => $category->name, 'title' => 'Some test thread', 'content' => 'This was a test']);
        $response->assertStatus(403);

        Auth::loginUsingId(4);

        $response = $this->json('POST', '/api/threads', ['category' => $category->name, 'title' => 'Some test thread', 'content' => 'This was a test']);
        $response->assertStatus(200);

        $thread = Thread::latest()->firstOrFail();

        $response = $this->json('POST', "/api/threads/$thread->id", ['locked' => 1]);
        $response->assertStatus(403);

        $response = $this->json('DELETE', "/api/threads/$thread->id");
        $response->assertStatus(403);

        Auth::loginUsingId(1);

        $response = $this->json('POST', "/api/threads/$thread->id");
        $response->assertStatus(422);

        $response = $this->json('POST', "/api/threads/$thread->id", ['title' => 'Test title', 'locked' => 1]);
        $response->assertStatus(200);

        $response = $this->get("/api/threads/$thread->id");
        $response->assertStatus(200);

        $response = $this->json('DELETE', "/api/threads/$thread->id");
        $response->assertStatus(200);
    }
}
