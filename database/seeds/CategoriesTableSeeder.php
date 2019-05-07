<?php

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\DataProvider\CategoriesProvider;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Category::insert(CategoriesProvider::categoryEntry());
    }
}
