<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Chatmessage;

class ChatmessageSeeder extends Seeder
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
