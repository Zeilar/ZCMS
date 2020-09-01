<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Faker\Generator as Faker;
use App\Subcategory;
use App\Thread;
use App\User;

$factory->define(Thread::class, function (Faker $faker) {
    $title = $faker->sentence(10);
    return [
        'title'          => $title,
        'slug'           => str_replace(' ', '-', $title),
        'user_id'        => User::inRandomOrder()->limit(1)->first()->id,
        'subcategory_id' => Subcategory::inRandomOrder()->limit(1)->first()->id,
    ];
});