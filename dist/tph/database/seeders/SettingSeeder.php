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
        Setting::create(['name' => 'perPage', 'default' => '20', 'datatype' => 'int']);
        Setting::create(['name' => 'avatar', 'default' => 'default.png']);
        Setting::create(['name' => 'signature', 'default' => null]);
    }
}
