<?php

use Illuminate\Database\Seeder;
use App\Models\Organiser;
use App\DataProvider\OrganiserProvider;

class OrganisersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Organiser::insert(OrganiserProvider::organiserEntry());
    }
}
