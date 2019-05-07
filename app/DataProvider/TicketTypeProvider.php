<?php

namespace App\DataProvider;

use Carbon\Carbon;

abstract class TicketTypeProvider
{
    
    public static function ticketTypeEntry()
    {
        return array(
            array(
            	'id' => '1',
            	'name' => 'Free Ticket',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            	 ),
            array(
                'id' => '2',
                'name' => 'Paid Ticket',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                 ),
            array(
                'id' => '3',
                'name' => 'Donation',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                 ),
        );
    }
}