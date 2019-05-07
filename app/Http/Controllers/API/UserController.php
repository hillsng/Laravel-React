<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth; 
use Validator;
use App\Models\User; 

class UserController extends Controller
{
    public $successStatus = 200;
     /** 
     * login api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function login()
    { 
        if(Auth::attempt(['email' => request('email'), 'password' => request('password')]) ){
            $user = Auth::user(); 
            $success['token'] =  $user->createToken('MyApp')-> accessToken; 
            $user->api_token = $success['token'];
            $user->save();
            return response()->json(['success' => $success], $this-> successStatus); 
        } 
        else{ 
            return response()->json(['error'=>'Unauthorised'], $this-> successStatus);
        } 
    }

    public function logout (Request $request) {

    	dd($request->all());

	    $api_token = explode(" ", Request::header('Authorization'))[1];
        $user = User::where(['api_token' => $api_token])->first();
        if (Auth::check()) {
            Auth::user()->AauthAcessToken()->delete();
        }
        if ($user) {
            //$token =  $user->createToken('clothSell')->accessToken;
            $user->update(['api_token' => null]);
        }
        return response()->json([
            'status' => 'success'
        ], 200);

	}

     /** 
     * Register api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function register(Request $request) 
    { 
        $validator = Validator::make($request->all(), [
            'name' => 'required', 
            'email' => 'required|email', 
            'password' => 'required',
        ]);

        if ($validator->fails()) { 
            return response()->json(['error'=>$validator->errors()], $this-> successStatus);
        }
        $input = $request->all(); 
        $input['password'] = bcrypt($input['password']); 
        $user = User::create($input); 
        $success['token'] =  $user->createToken('MyApp')-> accessToken; 
        $success['name'] =  $user->name;
        $user->api_token = $success['token'];
        $user->save();
        
        return response()->json(['success'=>$success], $this-> successStatus); 
    }
    
     /** 
     * details api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function details(Request $request)
    {
        $header = $request->bearerToken('Authorization');
        $user = User::where('api_token',$header)->first();
        //dd($user->name);
        return response()->json(['success' => $user], $this-> successStatus);
    }
}
