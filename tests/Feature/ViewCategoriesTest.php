<?php

namespace Tests\Feature;

use Tests\TestCase;
use Auth;

class ViewCategoriesTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testExample()
    {
        $response = $this->get('/api/categories');
        $response->assertStatus(200);

        $response = $this->get('/api/categories/1');
        $response->assertStatus(200);

        Auth::loginUsingId(1);
        
        $response = $this->get('/api/categories');
        $response->assertStatus(200);
        
        $response = $this->get('/api/categories/1');
        $response->assertStatus(200);
    }
}
