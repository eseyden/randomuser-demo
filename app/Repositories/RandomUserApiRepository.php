<?php

namespace App\Repositories;

use App\Services\RandomUserApiService;
use Illuminate\Support\Carbon;

class RandomUserApiRepository implements RandomUserRepositoryInterface
{
    public function __construct(public RandomUserApiService $randomUserApiService) {}

    /**
     * Fetches a specified number of random users from an external API,
     * processes the responses, and returns an array of users with their
     * first name, last name, and formatted birthday.
     *
     * @param  int  $amount  The number of random users to fetch. Defaults to 25.
     * @return array An array of associative arrays, each containing 'first_name', 'last_name', and 'birthday'.
     */
    public function getRandomUsers(int $amount = 25): array
    {
        $apiResponse = $this->randomUserApiService->getUsers(amount: $amount); // Call the Randomuser.me API
        $users = collect($apiResponse->results); // Collect results
        $users = $users->map(function ($item) { // Transform results into data structure suitable for randomuser table
            return [
                'first_name' => $item->name->first,
                'last_name' => $item->name->last,
                'birthday' => Carbon::parse($item->dob->date)->format('Y-m-d'),
            ];
        });

        return $users->toArray(); // Unwrap collection into array
    }
}
