<?php

namespace Tests\Feature;

use Tests\TestCase;

class ViewProfileThreadsTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testExample()
    {
        $response = $this->get('/api/profile/1/threads');

        $response->assertStatus(200);
    }
}
