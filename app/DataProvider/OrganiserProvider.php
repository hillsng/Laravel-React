<?php

namespace App\DataProvider;

use Carbon\Carbon;

abstract class OrganiserProvider
{
    
    public static function organiserEntry()
    {
        return array(
            array(
            	'id' => '1',
            	'name' => 'ABC Team',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            	 ),
            array(
                'id' => '2',
                'name' => 'XYZ Team',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                 ),
            array(
                'id' => '3',
                'name' => 'PQR Team',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                 ),
        );
    }
}