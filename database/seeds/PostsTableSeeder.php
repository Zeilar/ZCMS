<?php

use Illuminate\Database\Seeder;
use App\Post;
use App\Tag;

class PostsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Post::class, 50)->create()->each(function($post) {
            $post->tags()->sync(Tag::inRandomOrder()->limit(rand(0, Tag::count()))->get());
        });
    }
}