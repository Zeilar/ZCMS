<?php

namespace Tests\Feature;

use Tests\TestCase;
use Auth;

class LogoutTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testExample()
    {
        Auth::loginUsingId(1);
        $response = $this->get('/api/logout');

        $response->assertStatus(302);
    }
}
