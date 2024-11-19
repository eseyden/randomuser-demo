<?php

namespace Tests\Feature;

use App\Repositories\RandomUserFakerRepository;
use App\Repositories\RandomUserRepositoryInterface;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ImportRandomUsersCommandTest extends TestCase
{
    // Run migrations on in memory sqlite DB and wrap test in a transaction
    use RefreshDatabase;

    public function testCommandPopulatesDatabase()
    {
        // Rather than call the API, use a repository that generates random users using faker
        $this->app->bind(RandomUserRepositoryInterface::class, RandomUserFakerRepository::class);
        $this->artisan('app:import-random-users'); // Call artisan command
        $this->assertDatabaseCount('randomusers', 25); // Ensure DB got populated
    }
}
