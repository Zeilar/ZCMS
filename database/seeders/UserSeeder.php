<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $superadminRole = Role::where('name', 'superadmin')->first();
        $adminRole = Role::where('name', 'admin')->first();
        $moderatorRole = Role::where('name', 'moderator')->first();
        $memberRole = Role::where('name', 'member')->first();

        $superadmin = User::create([
            'username' => 'Philip',
            'email'    => 'philip@angelin.dev',
            'avatar'   => 'philip.png',
            'password' => Hash::make(env('ADMIN_PASSWORD')),
        ]);
        $superadmin->roles()->sync([$superadminRole->id, $adminRole->id, $moderatorRole->id, $memberRole->id]);
        
        $admin = User::create([
            'username' => 'Admin',
            'email'    => 'admin@example.com',
            'password' => Hash::make('123'),
        ]);
        $admin->roles()->sync([$adminRole->id, $moderatorRole->id, $memberRole->id]);

        $moderator = User::create([
            'username' => 'Moderator',
            'email'    => 'moderator@example.com',
            'password' => Hash::make('123'),
        ]);
        $moderator->roles()->sync([$moderatorRole->id, $memberRole->id]);

        $user = User::create([
            'username' => 'User',
            'email'    => 'user@example.com',
            'password' => Hash::make('123'),
        ]);
        $user->roles()->sync([$memberRole->id]);

        User::factory()->count(20)->create()->each(function($user) use ($memberRole) {
            $user->roles()->attach($memberRole);
        });
    }
}
