<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login', 'API\UserController@login');
Route::post('register', 'API\UserController@register');
Route::get('/userDetails', 'API\UserController@details');

Route::post('logout', 'API\UserController@logout');
Route::resource('event', 'API\EventController');
Route::resource('organiser', 'API\OrganiserController');
Route::get('/organisers', 'API\EventController@fetchOrganisers');
Route::get('/ticketTypes', 'API\EventController@fetchTicketTypes');
Route::get('/categories', 'API\EventController@fetchCategories');
Route::get('/topics', 'API\EventController@fetchTopics');
/*Route::group(['middleware' => 'auth:api'], function () {
});*/