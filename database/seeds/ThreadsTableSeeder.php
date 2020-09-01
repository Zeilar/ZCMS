<?php

use Illuminate\Database\Seeder;
use App\Subcategory;
use App\Thread;

class ThreadsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Thread::class, Subcategory::count() * 5)->create();
    }
}