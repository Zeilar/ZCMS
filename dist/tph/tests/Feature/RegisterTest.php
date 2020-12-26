<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Tests\TestCase;

class RegisterTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testExample()
    {
        $username = Str::random(rand(5, 15));

        $response = $this->json('POST', '/api/register', [
            'username'              => 'admin',
            'email'                 => "admin@example.com",
            'password'              => '123123',
            'password_confirmation' => '123123',
        ]);
        $response->assertStatus(422);

        $response = $this->json('POST', '/api/register', [
            'username'              => $username,
            'email'                 => "$username@example.com",
            'password'              => '123123',
            'password_confirmation' => '123123',
        ]);
        $response->assertStatus(200);

        $response = $this->json('POST', '/api/register', [
            'username'              => $username,
            'email'                 => "$username@example.com",
            'password'              => '123123',
            'password_confirmation' => '123123',
        ]);
        $response->assertStatus(405);
    }
}
