<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\PostLike;
use App\Post;
use Faker\Generator as Faker;

$factory->define(PostLike::class, function (Faker $faker) {
    $post = Post::inRandomOrder()->limit(1)->first();
    return [
        'post_id' => $post->id,
        'user_id' => $post->user->id,
    ];
});
