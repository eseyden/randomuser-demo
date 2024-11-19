<?php

namespace App\Repositories;

use Faker\Factory;
use Faker\Generator;

/**
 * Class RandomUserFakerRepository
 *
 * Implements the RandomUserRepositoryInterface to generate random user data without API call for faster tests.
 */
class RandomUserFakerRepository implements RandomUserRepositoryInterface
{
    private Generator $fakerGenerator;

    public function __construct(Factory $fakerFactory)
    {
        $this->fakerGenerator = $fakerFactory->create();
    }

    /**
     * Generates an array of random users.
     *
     * @param  int  $amount  The number of random users to generate. Default is 25.
     * @return array An array of random users, each containing 'first_name', 'last_name', and 'birthday'.
     */
    public function getRandomUsers(int $amount = 25): array
    {
        $randomUsers = [];
        for ($i = 0; $i < $amount; $i++) {
            $randomUsers[] = [
                'first_name' => $this->fakerGenerator->firstName,
                'last_name' => $this->fakerGenerator->lastName,
                'birthday' => $this->fakerGenerator->dateTimeBetween('-50 years', '-20 years')->format('Y-m-d'), // Avoid small children
            ];
        }

        return $randomUsers;
    }
}
