<?php

use Illuminate\Database\Seeder;
use App\Subcategory;
use App\Category;

class SubcategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Subcategory::class, Category::count() * 3)->create();
    }
}