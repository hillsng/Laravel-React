<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use App\Models\Event;

class TicketDescription extends Model
{
    protected $table = 'ticket_description';

    protected $fillable = [
        'event_id', 'ticket_type_id','name','quantity',
        'price','description','start_date_time','end_date_time',
        'minimum_tickets','maximum_tickets','ticket_promoter_program'
    ];

    public function events() {
        return $this->belongsTo(Event::class, 'event_id');
    }
}
