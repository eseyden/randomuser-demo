<?php

use App\Http\Controllers\RandomUserApiController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('index');
});

Route::get('/api/random-users', [RandomUserApiController::class, 'index'])->name('api.random-users');
