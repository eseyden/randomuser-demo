<?php

namespace Tests\Unit;

use GuzzleHttp\Exception\RequestException;
use GuzzleHttp\Psr7\Request;
use GuzzleHttp\Psr7\Response;
use Mockery\MockInterface;
use Tests\TestCase;

class RandomUserApiServiceTest extends TestCase
{
    /**
     * Mocks a Guzzle HTTP client to simulate a 'GET' request to the RandomUser API
     * and asserts that the response value is equal to 1.
     */
    public function testGetUsersDefaults(): void
    {

        $mockGuzzleClient = $this->mock(\GuzzleHttp\Client::class, function (MockInterface $mock) {

            // Build mocked API response
            $responseBody = json_encode(['success' => true]);
            $response = new Response(200, [], $responseBody);

            // Use mockery to test that our default query values are getting passed to the API request params.
            $mock->shouldReceive('request')
                ->with('GET', '', [
                    'query' => [
                        'results' => 25,
                        'nat' => 'us,ca',
                        'inc' => 'name,dob',
                    ],
                ])
                ->andReturn($response) // Have client return mock API response
                ->once();
        });

        // Instance API service with mocked HTTP client
        $randomUserApiService = new \App\Services\RandomUserApiService($mockGuzzleClient);
        $results = $randomUserApiService->getUsers();

        // Test that the decoded json object matches the one encoded for $responseBody
        $this->assertTrue($results->success);
    }

    public function testGetUsers(): void
    {

        $mockGuzzleClient = $this->mock(\GuzzleHttp\Client::class, function (MockInterface $mock) {

            // Build mocked API response
            $responseBody = json_encode(['newResults' => true]);
            $response = new Response(200, [], $responseBody);

            // Use mockery to test that our function params are getting passed to the API query.
            $mock->shouldReceive('request')
                ->with('GET', '', [
                    'query' => [
                        'results' => 10,
                        'nat' => 'gb',
                        'inc' => 'name,email',
                    ],
                ])
                ->andReturn($response) // Have client return mock API response
                ->once();
        });

        // Instance API service with mocked HTTP client
        $randomUserApiService = new \App\Services\RandomUserApiService($mockGuzzleClient);
        $results = $randomUserApiService->getUsers(amount: 10, inc: 'name,email', nat: 'gb');

        // Test that the decoded json object matches the one encoded for $responseBody
        $this->assertTrue($results->newResults);
    }

    /**
     * Tests the exception handling of the Random User API Client
     */
    public function testExceptionHandling(): void
    {
        // Build fake RequestException and mock HTTP client simulating an error communicating to the API
        $exception = new RequestException('Error Communicating with Server', new Request('GET', ''));
        $mockGuzzleClient = $this->mock(\GuzzleHttp\Client::class, function (MockInterface $mock) use ($exception) {
            $mock->shouldReceive('request')
                ->andThrow($exception)
                ->once();
        });
        $randomUserApiService = new \App\Services\RandomUserApiService($mockGuzzleClient);
        $results = $randomUserApiService->getUsers();

        // Client returns null on exceptions
        $this->assertNull($results);

        // Check that the client stored exception for debugging
        $this->assertEquals($exception, $randomUserApiService->getLastException());
    }
}
