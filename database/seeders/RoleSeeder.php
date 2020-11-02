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
        Role::create(['name' => 'superadmin', 'color' => 'var(--color-main)', 'clearance' => 1]);
        Role::create(['name' => 'admin', 'color' => 'rgb(127, 0, 0)', 'clearance' => 2]);
        Role::create(['name' => 'moderator', 'color' => 'rgb(255, 127, 0)', 'clearance' => 3]);
        Role::create(['name' => 'user', 'clearance' => 4]);
    }
}
