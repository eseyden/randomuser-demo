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
        $randomUsers = Randomuser::paginate(5);

        return response()->json($randomUsers);
    }
}
