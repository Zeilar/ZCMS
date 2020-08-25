<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Faker\Generator as Faker;
use App\Comment;
Use App\Post;
use App\User;

$factory->define(Comment::class, function (Faker $faker) {
    return [
        'content' => $faker->text(100),
        'post_id' => Post::inRandomOrder()->limit(1)->first()->id,
        'user_id' => User::inRandomOrder()->limit(1)->first()->id,
    ];
});
