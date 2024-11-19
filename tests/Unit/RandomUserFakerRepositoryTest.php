<?php

namespace Tests\Unit;

use App\Repositories\RandomUserFakerRepository;
use Tests\TestCase;

class RandomUserFakerRepositoryTest extends TestCase
{
    private RandomUserFakerRepository $randomUserFakerRepository;

    protected function setUp(): void
    {
        parent::setUp();

        $this->randomUserFakerRepository = $this->app->make(RandomUserFakerRepository::class);
    }

    /**
     * Test RandomUserFakerRepository's getRandomUsers method with a default amount of users.
     */
    public function testGetRandomUsersWithDefaultAmount(): void
    {
        $randomUsers = $this->randomUserFakerRepository->getRandomUsers();

        $this->assertCount(25, $randomUsers);
        $this->assertContainsOnly('array', $randomUsers);
    }

    /**
     * Test RandomUserFakerRepository's getRandomUsers method with a custom amount of users.
     */
    public function testGetRandomUsersWithCustomAmount(): void
    {
        $customAmount = 30;
        $randomUsers = $this->randomUserFakerRepository->getRandomUsers($customAmount);

        $this->assertCount($customAmount, $randomUsers);
        $this->assertContainsOnly('array', $randomUsers);
    }

    /**
     * Test each user data created by RandomUserFakerRepository's getRandomUsers method.
     */
    public function testRandomUserData(): void
    {
        $randomUsers = $this->randomUserFakerRepository->getRandomUsers();

        foreach ($randomUsers as $randomUser) {
            $this->assertArrayHasKey('first_name', $randomUser);
            $this->assertArrayHasKey('last_name', $randomUser);
            $this->assertArrayHasKey('birthday', $randomUser);
            $this->assertMatchesRegularExpression("/\d{4}-\d{2}-\d{2}/", $randomUser['birthday']);
        }
    }
}
