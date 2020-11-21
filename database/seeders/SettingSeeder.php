<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Setting;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Setting::create(['name' => 'perPage', 'datatype' => 'number']);
        Setting::create(['name' => 'avatar', 'datatype' => 'stirng']);
        Setting::create(['name' => 'signature', 'datatype' => 'string']);
    }
}
