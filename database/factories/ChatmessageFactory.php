<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Faker\Generator as Faker;
use App\Chatmessage;
use App\User;

$factory->define(Chatmessage::class, function (Faker $faker) {
    return [
        'content' => $faker->sentence(10),
        'user_id' => User::inRandomOrder()->limit(1)->first()->id,
    ];
});