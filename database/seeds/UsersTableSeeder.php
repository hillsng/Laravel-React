<?php

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::create(['name'=>'Admin','email'=>'admin@gmail.com','password'=>bcrypt('admin@123')]);

        $role_r = Role::where('name', '=','Admin')->firstOrFail();
        $user->assignRole($role_r); //Assigning role to user
    }
}
