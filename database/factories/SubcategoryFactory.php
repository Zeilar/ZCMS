<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Faker\Generator as Faker;
use App\Subcategory;
use App\Category;

$factory->define(Subcategory::class, function (Faker $faker) {
    $name = ucfirst($faker->word);

    return [
        'name'        => $name,
        'slug'        => str_replace(' ', '-', $name),
        'category_id' => Category::inRandomOrder()->limit(1)->first()->id,
    ];
});