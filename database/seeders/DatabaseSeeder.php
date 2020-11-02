<?php

namespace Database\Seeders;

use App\Models\{ Chatmessage, Postlike, Category, Thread, Role, User, Post };
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            RoleSeeder::class,
            UserSeeder::class,
            CategorySeeder::class,
        ]);
    }
}
