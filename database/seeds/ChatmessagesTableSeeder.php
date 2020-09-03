<?php

use Illuminate\Database\Seeder;
use App\Chatmessage;

class ChatmessagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Chatmessage::class, 50)->create();
    }
}