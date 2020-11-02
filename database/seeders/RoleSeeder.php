<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Role::create(['name' => 'superadmin', 'clearance' => 1]);
        Role::create(['name' => 'admin', 'clearance' => 2]);
        Role::create(['name' => 'moderator', 'clearance' => 3]);
        Role::create(['name' => 'user', 'clearance' => 4]);
    }
}
