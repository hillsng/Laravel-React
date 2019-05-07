<?php

use App\DataProvider\MainTopicProvider;
use App\Models\MainTopic;
use Illuminate\Database\Seeder;

class MainTopicTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        MainTopic::insert(MainTopicProvider::mainTopicEntry());
    }
}
