<?php

use Illuminate\Support\Facades\Schedule;

Schedule::command('app:import-random-users')->everyFiveMinutes();
