<?php

namespace App\Repositories;

use App\Services\RandomUserApiService;

class RandomUserApiRepository implements RandomUserRepositoryInterface
{
    public function __construct(public RandomUserApiService $randomUserApiService) {}

    public function getRandomUsers(int $amount = 25): array
    {
        $apiResponse = $this->randomUserApiService->getUsers(amount: $amount);
        $users = collect($apiResponse->results);
        $users = $users->map(function ($item) {
            return [
                'first_name' => $item->name->first,
                'last_name' => $item->name->last,
                'dob' => $item->dob->date,
            ];
        });

        return $users->toArray();
    }
}
