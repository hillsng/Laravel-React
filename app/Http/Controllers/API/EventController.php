<?php

namespace App\Http\Controllers\API;

use App\Models\MainTopic;
use App\Models\TicketType;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\TicketDescription;
use App\Models\Organiser;
use App\Models\Category;
use App\Http\Requests\EventRequest;
use Validator;


class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Event::all();
        return response()->json(array(
            'status' => 'success',
            'data' => $data
        ), 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $requestData = $request->all();
        if (!empty($requestData['image'])) {
            $directory = '/images/uploads/events/';
            $destinationPath = public_path($directory);
            $currentDateTime = time();

            $encodedImgString = explode(',', $requestData['image'], 2)[1];
            $decodedImgString = base64_decode($encodedImgString);
            $info = getimagesizefromstring($decodedImgString);

            $image = $requestData['image'];  // your base64 encoded
            $image = str_replace('data:'.$info['mime'].';base64,', '', $image);
            $image = str_replace(' ', '+', $image);
            $imageName = $currentDateTime.'.'.substr($info['mime'],6);
            \File::put($destinationPath.'/' . $imageName, base64_decode($image));
            $requestData['image'] = $imageName;
        }
        /*$request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048000',
        ]);
        }*/
        $data = Event::create($requestData);

        if(!empty($requestData['ticket_type_id']) && !empty($requestData['ticket_name']) ){
            $requestData['event_id'] = $data->id;
            $requestData['name'] = $requestData['ticket_name'];
            $requestData['start_date_time'] = Carbon::parse(str_replace('/','-',$requestData['ticket_start_date']))->format('Y-m-d').' '.$requestData['ticket_start_time'];
            $requestData['end_date_time'] = Carbon::parse(str_replace('/','-',$requestData['ticket_end_date']))->format('Y-m-d').' '.$requestData['ticket_end_time'];
            $requestData['description'] = $requestData['ticket_description'];
            TicketDescription::create($requestData);
        }
        return response()->json(array(
            'status' => 'success',
            'data' => $data,
            'message' => 'Successfully created !'
        ), 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Event $event)
    {
        $event->load(['ticketDetails','organiserDetails']);
        return response()->json(array(
            'status' => 'success',
            'data' => $event
        ), 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Event $event)
    {
        return response()->json(array(
            'status' => 'success',
            'data' => $event
        ), 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Event $event)
    {
        $requestData = $request->all();
        
        if( empty( $requestData['image'] ) )
            unset( $requestData['image'] );

       /* $directory = '/images/uploads/events/';
        $destinationPath = public_path($directory);
        $currentDateTime = time();
        if( $request->hasFile('image') ) {
            $image = $request->file('image');
            $name = $currentDateTime.'.'.$image->getClientOriginalExtension();
            $imagePath = $destinationPath. "/".  $name;
            $image->move($destinationPath, $name);
            $requestData['image'] = $name;
        }*/

        $event->update($requestData);
        return response()->json(array(
            'status' => 'success',
            'data' => $event,
            'message' => 'Successfully updated !'
        ), 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Event $event)
    {
        $id = $event->id;
        $event->delete();
        return response()->json(array(
            'status' => 'success',
            'data' => $id,
            'message' => 'Successfully deleted !'
        ), 200);
    }

    public function fetchOrganisers()
    {
        $data = Organiser::all();
        return response()->json(array(
            'status' => 'success',
            'data' => $data
        ), 200);
    }

    public function fetchTicketTypes()
    {
        $data = TicketType::all();
        return response()->json(array(
            'status' => 'success',
            'data' => $data
        ), 200);
    }

    public function fetchCategories()
    {
        $data = Category::all();
        return response()->json(array(
            'status' => 'success',
            'data' => $data
        ), 200);
    }

    public function fetchTopics()
    {
        $data = MainTopic::all();
        return response()->json(array(
            'status' => 'success',
            'data' => $data
        ), 200);
    }
}
