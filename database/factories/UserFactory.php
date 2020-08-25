<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use \Illuminate\Support\Facades\Hash;
use Faker\Generator as Faker;
use App\User;
use App\Role;

$factory->define(User::class, function (Faker $faker) {
    return [
        'username' => $faker->firstName() . $faker->lastName(),
        'email'    => $faker->safeEmail,
        'password' => Hash::make('123'),
    ];
});