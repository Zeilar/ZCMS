<?php

namespace Tests\Feature;

use Tests\TestCase;

class ViewProfileTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testExample()
    {
        $response = $this->get('/api/profile/1');

        $response->assertStatus(200);
    }
}
