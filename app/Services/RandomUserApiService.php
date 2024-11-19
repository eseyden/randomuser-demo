<?php

namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;

/**
 * This service provides methods to interact with the Random User API.
 */
class RandomUserApiService
{
    protected ?GuzzleException $guzzleException = null;

    public function __construct(protected Client $client) {}

    /**
     * Get Users
     * ------------------------------------------------------------------------------------
     * Retrieves a list of users with specified parameters.
     *
     * @param  ?int  $amount  Number of users to retrieve (default is 25)
     * @param  ?string  $nat  Nationalities filter, comma-separated (default is 'us,ca')
     * @param  ?string  $inc  Field Filter, comma-separated (default is name,dob)
     * @return string|false The JSON response from the API as a string, or false on failure
     */
    public function getUsers(?int $amount = 25, ?string $nat = 'us,ca', ?string $inc = 'name,dob'): mixed
    {
        // Initialize State
        $params = [];
        $query = [];
        $this->guzzleException = null;

        // Validate Input
        if (is_int($amount)) {
            $query['results'] = $amount;
        }
        if (is_string($nat)) {
            $query['nat'] = $nat;
        }
        if (is_string($inc)) {
            $query['inc'] = $inc;
        }

        // Build GET query params
        if (count($query) > 0) {
            $params['query'] = $query;
        }

        // Execute Guzzle HTTP request and catch exceptions
        try {
            $response = $this->client->request('GET', '', $params);
        } catch (GuzzleException $guzzleException) {
            $this->guzzleException = $guzzleException;

            return null;
        }

        return json_decode($response->getBody()->getContents());
    }

    /**
     * Get Last Exception
     * ------------------------------------------------------------------------------------
     * If the function Get Users returns false you can retrieve the caught Guzzle Exception
     */
    public function getLastException(): ?GuzzleException
    {
        return $this->guzzleException;
    }
}
