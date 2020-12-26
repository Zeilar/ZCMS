<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Postlike;
use App\Models\Post;

class PostlikeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Postlike::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $post = Post::inRandomOrder()->limit(1)->first();
        
        return [
            'post_id' => $post->id,
            'user_id' => $post->user->id,
        ];
    }
}
