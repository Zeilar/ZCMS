<?php

use Illuminate\Database\Seeder;
use App\Thread;
use App\Post;

class PostsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Post::class, Thread::count() * 10)->create();
    }
}