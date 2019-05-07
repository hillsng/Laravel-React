<?php

use Illuminate\Database\Seeder;
use App\Models\TicketType;
use App\DataProvider\TicketTypeProvider;

class TicketTypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        TicketType::insert(TicketTypeProvider::ticketTypeEntry());
    }
}
