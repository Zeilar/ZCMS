<?php

use Illuminate\Database\Seeder;
use App\Thread;
use App\User;

class ThreadsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Thread::class, User::count() * 3)->create();
    }
}
