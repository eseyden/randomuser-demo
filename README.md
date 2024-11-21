# Random User Demo

Thank you for checking out this project.

To get started you will need [Docker Desktop](https://docs.docker.com/get-started/get-docker/) and optionally the GNU
`make` utility
with `docker-compose` and ports `80` & `5173` available.

## Setup

### Automated Setup with Make

Run these two commands to start the app for the first time.

- `make`
    - Installs dependencies, builds assets and runs migrations
- `make up`
    - Runs `docker-compose up` and checks if migrations are needed

The app should now be available at http://localhost/

[Documentation for the Makefile](docs/Makefile.md)

### Manual Setup with docker-compose

With just docker installed run these commands:

```bash
docker-compose run --rm app composer install
docker-compose run --rm node npm install
cp .env.example .env
docker-compose run --rm app php artisan key:generate
docker-compose run --rm node npm run build
docker-compose up -d
docker-compose exec app php artisan migrate
```

The app should now be available at http://localhost/

## Use

### Importing Random Users

Laravel's scheduler has been set up in the `docker-compose.yaml` file to run `app:import-random-users` to run every five
minutes.
This is configured in `routes/console.php`

It may be run manually while the app is up via these two commands:

- `make import-users`
- `docker-compose exec app php artisan app:import-random-users`

You can reset the database with this command:

- `make migrate-fresh`
- `docker-compose exec app php artisan migrate:fresh`

## Development Environment

### Frontend Build Command

To build new bundles of Frontend assets after development is finished run `make npm-build`.

### Frontend HMR Development Server

### Local Node Development

Frontend development is usually done with a local copy of Node; I recommend installing it
with [Volta](https://volta.sh/).

Running `npm install` and `npm run dev` will provide a development environment
that automatically reloads components as they are changed.

### Docker Node Development

The development environment can be run with a Docker container via `make dev` or
`docker-compose --profile frontend up -d`
