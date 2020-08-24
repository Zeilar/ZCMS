<?php

use Illuminate\Database\Seeder;
use App\Role;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Role::create(['name' => 'admin', 'clearance' => 1]);
        Role::create(['name' => 'moderator', 'clearance' => 2]);
        Role::create(['name' => 'author', 'clearance' => 3]);
        Role::create(['name' => 'user', 'clearance' => 4]);
    }
}