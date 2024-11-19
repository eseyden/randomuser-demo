<?php

namespace App\Repositories;

interface RandomUserRepositoryInterface
{
    public function getRandomUsers(int $amount = 25): array;
}
