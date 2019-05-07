<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Event extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'title', 'location', 'image', 'start_date', 'start_time', 'end_date', 'end_time', 'description', 'organiser_id', 'organiser_description', 'category_id', 'ticket_type_id','main_topic_id', 'event_type', 'remaining_tickets', 'status'
    ];


    public function ticketDetails()
    {
        return $this->hasMany(TicketDescription::class);
    }

    public function organiserDetails()
    {
        return $this->hasOne(Organiser::class,'id','organiser_id');
    }

    public function setStartDateAttribute($value)
    {

        $this->attributes['start_date'] = Carbon::parse(str_replace('/', '-', $value))->format('Y-m-d');
    }

    public function setEndDateAttribute($value)
    {
        $this->attributes['end_date'] = Carbon::parse(str_replace('/', '-', $value))->format('Y-m-d');
    }


}
