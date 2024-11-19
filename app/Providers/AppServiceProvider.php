<?php

namespace App\Providers;

use App\Repositories\RandomUserApiRepository;
use App\Repositories\RandomUserRepositoryInterface;
use App\Services\RandomUserApiService;
use GuzzleHttp\Client;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Bind the API client's dependencies to the app container
        $this->app->singleton(RandomUserApiService::class, function () {
            // Configure Guzzle HTTP Client with randomuser.me's base uri from app's config
            $client = new Client([
                'base_uri' => config('services.random_user.base_uri'),
                'headers' => [
                    'Accept' => 'application/json',
                ],
            ]);

            return new RandomUserApiService($client);
        });

        // Anytime the app requests a RandomUser Repository provide the one that uses the randomuser.me's API
        $this->app->bind(RandomUserRepositoryInterface::class, RandomUserAPIRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
