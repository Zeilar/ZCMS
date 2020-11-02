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

        function createCategory(string $name, string $icon): void {
            Category::factory(['name' => $name, 'icon' => $icon])
                ->has(Thread::factory()->count(rand(15, 30))
                    ->has(Post::factory()->count(rand(15, 30))
                        ->has(Postlike::factory()->count(rand(1, 3)))
                    )
                )
            ->count(1)
            ->create();
        }

        createCategory('General', 'general');
        createCategory('Gaming', 'gaming');
        createCategory('Astronomy', 'astronomy');
        createCategory('Sciene', 'science');
        createCategory('Hobby', 'hobby');
        createCategory('Entertainment', 'entertainment');
        createCategory('Food', 'food');
        createCategory('Sport', 'sport');
        createCategory('Politics', 'politics');
        Chatmessage::factory()->count(50)->create();
    }
}
