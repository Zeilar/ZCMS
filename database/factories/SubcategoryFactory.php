<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Subcategory;
use App\Models\Category;

class SubcategoryFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Subcategory::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $name = ucfirst($this->faker->word);

        return [
            'name'        => $name,
            'slug'        => str_replace(' ', '-', $name),
            'category_id' => Category::inRandomOrder()->limit(1)->first()->id,
        ];
    }
}
