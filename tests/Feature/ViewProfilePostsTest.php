<?php

namespace Tests\Feature;

use Tests\TestCase;

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
    }
}
