<?php

namespace Tests\Unit;

use App\Services\RandomUserApiService;
use Tests\TestCase;

class RandomUserApiRepositoryTest extends TestCase
{
    public function testGetRandomUser()
    {
        $mockApiService = $this->mock(RandomUserApiService::class, function ($mock) {
            $mock->shouldReceive('getUsers')
                ->andReturn((object) [
                    'results' => [
                        (object) [
                            'name' => (object) ['first' => 'John', 'last' => 'Doe'],
                            'dob' => (object) ['date' => '1976-10-10'],
                        ],
                        (object) [
                            'name' => (object) ['first' => 'Jane', 'last' => 'Doe'],
                            'dob' => (object) ['date' => '1985-09-09'],
                        ],
                    ],
                ])
                ->once();
        });
        $repository = new \App\Repositories\RandomUserApiRepository($mockApiService);

        $users = $repository->getRandomUsers();
        $this->assertIsArray($users);

        $expected = [
            ['first_name' => 'John', 'last_name' => 'Doe', 'dob' => '1976-10-10'],
            ['first_name' => 'Jane', 'last_name' => 'Doe', 'dob' => '1985-09-09'],
        ];

        $this->assertEquals($expected, $users);
    }
}
