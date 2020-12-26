<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Chatmessage;
use App\Models\User;

class ChatmessageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Chatmessage::factory()->count(User::count() * 30)->create();
    }
}
