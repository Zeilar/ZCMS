<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Chatmessage;

class ChatmessagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Chatmessage::factory()->count(50)->create();
    }
}
