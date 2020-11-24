<?php

namespace Tests\Feature;

use Tests\TestCase;
use Auth;

class ViewProfilePostsTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testExample()
    {
        $response = $this->get('/api/profile/1/posts');
        $response->assertStatus(200);

        Auth::loginUsingId(1);
        $response = $this->get('/api/profile/1/posts');
        $response->assertStatus(200);
    }
}
