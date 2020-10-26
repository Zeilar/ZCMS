<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Thread;
use App\Models\Post;
use App\Models\User;

class PostFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Post::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'content'   => $this->faker->text(1000),
            'user_id'   => User::inRandomOrder()->limit(1)->first()->id,
            'thread_id' => Thread::inRandomOrder()->limit(1)->first()->id,
        ];
    }
}
