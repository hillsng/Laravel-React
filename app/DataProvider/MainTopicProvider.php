<?php

namespace App\DataProvider;

use Carbon\Carbon;

abstract class MainTopicProvider
{

    public static function mainTopicEntry()
    {
        return array(
            array(
                'id' => '1',
                'name' => 'Topic 1',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ),
            array(
                'id' => '2',
                'name' => 'Topic 2',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ),
            array(
                'id' => '3',
                'name' => 'Topic 3',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ),
        );
    }
}