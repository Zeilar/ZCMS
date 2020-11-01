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
        Role::create(['name' => 'superadmin', 'color' => 'var(--color-main)', 'clearance' => 1]);
        Role::create(['name' => 'admin', 'color' => 'rgb(127, 0, 0)', 'clearance' => 2]);
        Role::create(['name' => 'moderator', 'color' => 'rgb(255, 127, 0)', 'clearance' => 3]);
        Role::create(['name' => 'user', 'clearance' => 4]);

        $superadminRole = Role::where('name', 'superadmin')->first();
        $adminRole = Role::where('name', 'admin')->first();
        $moderatorRole = Role::where('name', 'moderator')->first();
        $userRole = Role::where('name', 'user')->first();

        $admin = User::create([
            'username' => 'Philip',
            'email' => 'philip@angelin.com',
            'password' => Hash::make(env('ADMIN_PASSWORD')),
        ]);
        $admin->roles()->sync([$superadminRole->id, $adminRole->id, $moderatorRole->id, $userRole->id]);
        
        $admin = User::create([
            'username' => 'Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('123'),
        ]);
        $admin->roles()->sync([$adminRole->id, $moderatorRole->id, $userRole->id]);

        $moderator = User::create([
            'username' => 'Moderator',
            'email' => 'moderator@example.com',
            'password' => Hash::make('123'),
        ]);
        $moderator->roles()->sync([$moderatorRole->id, $userRole->id]);

        $user = User::create([
            'username' => 'User',
            'email' => 'user@example.com',
            'password' => Hash::make('123'),
        ]);
        $user->roles()->sync([$userRole->id]);

        User::factory()->count(10)->create()->each(function($user) use ($userRole) {
            $user->roles()->attach($userRole);
        });

        Category::create(['name' => 'General', 'icon' => 'chat']);
        Category::create(['name' => 'Gaming', 'icon' => 'controller']);
        Category::create(['name' => 'Astronomy', 'icon' => 'telescope']);
        Category::create(['name' => 'Sciene', 'icon' => 'science']);
        Category::create(['name' => 'Hobby', 'icon' => 'hobby']);
        Category::create(['name' => 'Movies', 'icon' => 'movies']);
        Category::create(['name' => 'Food', 'icon' => 'food']);
        Category::create(['name' => 'Sport', 'icon' => 'sport']);
        Category::create(['name' => 'Politics', 'icon' => 'politics']);
        Category::create(['name' => 'Random', 'icon' => 'random']);
        Thread::factory()->count(Category::count() * 30)->create();
        Post::factory()->count(Thread::count() * 10)->create();
        Postlike::factory()->count(Post::count() * 5)->create();
        Chatmessage::factory()->count(50)->create();
    }
}
