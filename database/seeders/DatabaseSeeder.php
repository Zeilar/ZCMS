<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\Storage;
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
        $files = Storage::allFiles('public/avatars');
        $superadminIcon = array_search('public/avatars/philip.png', $files);
        if ($superadminIcon) unset($files[$superadminIcon]);
        Storage::delete($files);

        $this->call([
            SettingSeeder::class,
            RankSeeder::class,
            RoleSeeder::class,
            UserSeeder::class,
            CategorySeeder::class,
        ]);
    }
}
