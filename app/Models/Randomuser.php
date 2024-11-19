<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Randomuser extends Model
{
    /** @use HasFactory<\Database\Factories\RandomuserFactory> */
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'birthday',
    ];
}
