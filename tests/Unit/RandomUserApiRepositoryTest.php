<?php

namespace Tests\Unit;

use App\Repositories\RandomUserApiRepository;
use App\Services\RandomUserApiService;
use Mockery\MockInterface;
use Tests\TestCase;

class RandomUserApiRepositoryTest extends TestCase
{
    public function testGetRandomUser()
    {
        /** @var MockInterface|RandomUserApiService $randomUserApiServiceMock */
        $mockApiService = $this->mock(RandomUserApiService::class, function ($mock) {
            // Prepare simulated decoded API response object and ensure the function is called once
            $mock->shouldReceive('getUsers')
                ->andReturn((object) [
                    'results' => [
                        (object) [
                            'name' => (object) ['first' => 'John', 'last' => 'Doe'],
                            'dob' => (object) ['date' => '1976-10-10T21:26:30.610Z'],
                        ],
                        (object) [
                            'name' => (object) ['first' => 'Jane', 'last' => 'Doe'],
                            'dob' => (object) ['date' => '1956-08-24T21:26:30.610Z'],
                        ],
                    ],
                ])
                ->once();
        });

        $repository = new RandomUserApiRepository($mockApiService);

        $users = $repository->getRandomUsers();
        $this->assertIsArray($users);

        $expected = [
            ['first_name' => 'John', 'last_name' => 'Doe', 'birthday' => '1976-10-10'],
            ['first_name' => 'Jane', 'last_name' => 'Doe', 'birthday' => '1956-08-24'],
        ];

        $this->assertEquals($expected, $users); // Ensure repository transforms API results properly.
    }
}
