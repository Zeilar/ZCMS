<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Faker\Generator as Faker;
use App\Thread;
use App\Post;
use App\User;

$factory->define(Post::class, function (Faker $faker) {
    return [
        'content'   => $faker->text(1000),
        'user_id'   => User::inRandomOrder()->limit(1)->first()->id,
        'thread_id' => Thread::inRandomOrder()->limit(1)->first()->id,
    ];
});