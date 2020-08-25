<?php

use Illuminate\Database\Seeder;
use App\Tag;

class TagsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Tag::create(['name' => 'javascript']);
        Tag::create(['name' => 'php']);
        Tag::create(['name' => 'c#']);
        Tag::create(['name' => 'c++']);
        Tag::create(['name' => 'c']);
    }
}