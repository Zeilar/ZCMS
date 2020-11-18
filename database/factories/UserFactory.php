<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;
use \Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;
use Exception;

class UserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        try {
            $generatedUser = json_decode(file_get_contents('https://randomuser.me/api'));
            $picture = $generatedUser->results[0]->picture->medium;
            $name = Str::uuid() . substr($picture, strrpos($picture, '/') + 1);
            Storage::put('public\avatars\\'.$name, file_get_contents($picture));
        } catch (Exception $e) {
            $name = 'default.png';
        }

        return [
            'username' => $this->faker->firstName() . $this->faker->lastName(),
            'email'    => $this->faker->safeEmail,
            'password' => Hash::make('123'),
            'avatar'   => $name,
        ];
    }
}
