<?php

namespace Tests\Feature;

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
        Auth::loginUsingId(1);

        $response = $this->json('POST', '/api/threads/1');
        $response->assertStatus(422);

        $response = $this->json('POST', '/api/threads/1', ['title' => 'Test title']);
        $response->assertStatus(200);
    }
}
