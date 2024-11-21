<?php

namespace Tests\Feature;

use App\Models\Randomuser;
use Database\Seeders\RandomuserSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class RandomUserApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(RandomUserSeeder::class);
    }

    public function testApiEndpointReturnsSuccessfulResponse()
    {
        $response = $this->get(route('api.random-users'));

        $response->assertStatus(200);
    }

    public function testApiEndpointReturnsResult()
    {
        $response = $this->get(route('api.random-users'));
        $randomUser = Randomuser::first();
        $response
            ->assertJson(fn (AssertableJson $json) => $json->where('current_page', 1)
                ->has('data', 15)
                ->has('data.0', fn (AssertableJson $json) => $json
                    ->where('id', $randomUser->id)
                    ->where('first_name', $randomUser->first_name)
                    ->where('last_name', $randomUser->last_name)
                    ->where('birthday', $randomUser->birthday)
                    ->etc()
                )
                ->etc()
            );
    }
}
