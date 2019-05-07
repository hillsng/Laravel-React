<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MainTopic extends Model
{
    use SoftDeletes;
    protected $table="main_topic";
    protected $fillable = [
        'name',
    ];
}
