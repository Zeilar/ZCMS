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
        Role::create(['name' => 'admin', 'color' => 'rgb(255, 0, 0)', 'clearance' => 1]);
        Role::create(['name' => 'moderator', 'color' => 'rgb(255, 127, 0)', 'clearance' => 2]);
        Role::create(['name' => 'user', 'clearance' => 3]);
    }
}