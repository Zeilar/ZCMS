<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Subcategory;
use App\Models\Thread;
use App\Models\User;

class ThreadFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Thread::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $title = $this->faker->sentence(10);

        return [
            'title'          => $title,
            'slug'           => str_replace(' ', '-', $title),
            'user_id'        => User::inRandomOrder()->limit(1)->first()->id,
            'subcategory_id' => Subcategory::inRandomOrder()->limit(1)->first()->id,
        ];
    }
}
