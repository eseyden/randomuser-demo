<?php

namespace Database\Seeders;

use App\Models\Randomuser;
use Illuminate\Database\Seeder;

class RandomuserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Randomuser::factory()->count(75)->create();
    }
}
