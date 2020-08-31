<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Thread;
use App\User;
use Faker\Generator as Faker;

$factory->define(Thread::class, function (Faker $faker) {
    $title = $faker->sentence(10);
    return [
        'title'   => $title,
        'slug'    => str_replace(' ', '-', $title),
        'user_id' => User::inRandomOrder()->limit(1)->first()->id,
    ];
});
