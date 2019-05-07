<?php

namespace App\DataProvider;

use Carbon\Carbon;

abstract class CategoriesProvider
{
    
    public static function categoryEntry()
    {
        return array(
            array(
            	'id' => '1',
            	'name' => 'ABC Event',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            	 ),
            array(
                'id' => '2',
                'name' => 'XYZ Event',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                 ),
            array(
                'id' => '3',
                'name' => 'PQR Event',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                 ),
        );
    }
}