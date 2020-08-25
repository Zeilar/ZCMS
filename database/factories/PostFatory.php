<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Faker\Generator as Faker;
use App\Post;
use App\User;

$factory->define(Post::class, function (Faker $faker) {
    return [
        'title'   => $faker->text(50),
        'content' => $faker->text(1000),
        'user_id' => User::inRandomOrder()->limit(1)->first()->id,
    ];
});