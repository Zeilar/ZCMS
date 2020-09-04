<?php

use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;
use App\Role;
use App\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $adminRole = Role::where('name', 'admin')->first();
        $moderatorRole = Role::where('name', 'moderator')->first();
        $userRole = Role::where('name', 'user')->first();
        
        $admin = User::create([
            'username' => 'Admin',
            'email' => 'admin@admin.com',
            'password' => Hash::make('123'),
        ]);
        $admin->roles()->sync([$adminRole->id, $moderatorRole->id, $userRole->id]);

        $moderator = User::create([
            'username' => 'Moderator',
            'email' => 'moderator@moderator.com',
            'password' => Hash::make('123'),
        ]);
        $moderator->roles()->sync([$moderatorRole->id, $userRole->id]);

        $user = User::create([
            'username' => 'User',
            'email' => 'user@user.com',
            'password' => Hash::make('123'),
        ]);
        $user->roles()->sync([$userRole->id]);

        factory(User::class, 10)->create()->each(function($user) use ($userRole) {
            $user->roles()->attach($userRole);
        });
    }
}