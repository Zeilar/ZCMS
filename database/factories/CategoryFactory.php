<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Faker\Generator as Faker;
use App\Category;

$factory->define(Category::class, function (Faker $faker) {
    $name = ucfirst($faker->word);

    return [
        'name' => $name,
        'slug' => str_replace(' ', '-', $name),
    ];
});
