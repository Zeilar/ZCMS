<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Category;
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

        // dd($this);

        return [
            'title'       => $title,
            'slug'        => Str::slug($title),
            'views'       => rand(10, 500),
            'user_id'     => User::inRandomOrder()->limit(1)->first()->id,
            'category_id' => Category::inRandomOrder()->limit(1)->first()->id,
        ];
    }
}
