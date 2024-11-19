<?php

namespace App\Http\Controllers;

use App\Models\Randomuser;
use App\Repositories\RandomUserRepositoryInterface;

class RandomUserApiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(RandomUserRepositoryInterface $randomUserRepository)
    {
        return Randomuser::paginate();
    }
}
