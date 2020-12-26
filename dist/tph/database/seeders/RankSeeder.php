<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Rank;

class RankSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Rank::create(['name' => 'pioneer', 'threshold' => 0]);
        Rank::create(['name' => 'procrastinator', 'threshold' => 100]);
        Rank::create(['name' => 'basementdweller', 'threshold' => 500]);
        Rank::create(['name' => 'legend', 'threshold' => 1000]);
    }
}
