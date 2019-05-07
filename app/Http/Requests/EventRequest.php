<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EventRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = [
            'title'=>'required',
            'location' => 'required',
            //'image' => 'mimes:jpeg,jpg,png,gif|required|max:10000',
            'start_date' => 'required|date',
            'start_time' => 'required',
            'end_date' => 'required|date',
            'end_time' => 'required',
            'description' => 'required',
            'organiser_id' => 'required',
            'organiser_description' => 'required',
            'category_id' => 'required',
        ];
        return $rules;
    }
}
