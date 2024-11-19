<?php

namespace App\Http\Controllers;

use App\Repositories\RandomUserRepositoryInterface;

class RandomUserApiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(RandomUserRepositoryInterface $randomUserRepository)
    {
        $users = $randomUserRepository->getRandomUsers();

        return $users;
        //
    }
}
