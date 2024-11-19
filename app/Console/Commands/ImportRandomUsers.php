<?php

namespace App\Console\Commands;

use App\Models\Randomuser;
use App\Repositories\RandomUserRepositoryInterface;
use Illuminate\Console\Command;

class ImportRandomUsers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:import-random-users';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle(RandomUserRepositoryInterface $randomUserRepository)
    {
        $userData = $randomUserRepository->getRandomUsers(); // Fetch users from repository
        Randomuser::upsert($userData, uniqueBy: ['first_name', 'last_name', 'birthday']); // Use upsert to prevent dupes
    }
}
