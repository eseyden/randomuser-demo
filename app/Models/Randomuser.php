<?php

namespace App\Models;

use Database\Factories\RandomuserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Randomuser extends Model
{
    /** @use HasFactory<RandomuserFactory> */
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'birthday',
    ];
}
