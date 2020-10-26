<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Postlike;
use App\Models\Post;

class PostlikesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Postlike::factory()->count(Post::count() * 5)->create();
    }
}
