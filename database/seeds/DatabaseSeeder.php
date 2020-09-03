<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(RolesTableSeeder::class);
        $this->call(UsersTableSeeder::class);
        $this->call(CategoriesTableSeeder::class);
        $this->call(SubcategoriesTableSeeder::class);
        $this->call(ThreadsTableSeeder::class);
        $this->call(PostsTableSeeder::class);
        $this->call(PostLikesTableSeeder::class);
        $this->call(LanguagesTableSeeder::class);
        $this->call(ChatmessagesTableSeeder::class);
    }
}
