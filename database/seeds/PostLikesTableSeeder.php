<?php

use Illuminate\Database\Seeder;
use App\PostLike;
use App\Post;

class PostLikesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(PostLike::class, Post::count() * 5)->create();
    }
}