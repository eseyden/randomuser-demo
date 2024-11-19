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
        $this->app->singleton(RandomUserApiService::class, function () {
            $client = new Client([
                'base_uri' => config('services.random_user.base_uri'),
                'headers' => [
                    'Accept' => 'application/json',
                ],
            ]);

            return new RandomUserApiService($client);
        });

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
