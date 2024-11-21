# Laravel, Docker, and React App Makefile Documentation

This Makefile facilitates the setup and management of a Laravel application with a Docker environment, which includes
both backend services and a React frontend. Below are the available make targets and their purposes:

## Variables

- `SHELL`: Shell environment used, defaults to `/bin/sh`.
- `DOCKER_COMPOSE`: Alias for `docker-compose` command.
- `APP_SERVICE`: Docker service name for the Laravel application (`app`).
- `NODE_SERVICE`: Docker service name for the Node.js/React application (`node`).
- `REQUIRED_SERVICES`: List of essential services (`app`, `caddy`, `mysql`).

## Targets

### `init`

Prepare the application for running after a fresh checkout. Executes:

- `composer-install`
- `npm-install`
- `copy-env-example`
- `generate-app-key`
- `npm-build`
- `up`
- `migrate`
- `down`

```sh
make init
```

### `copy-env-example`

Copy `.env.example` to `.env` if `.env` does not exist.

```sh
make copy-env-example
```

### `generate-app-key`

Generate an application key using Laravel's `artisan` command.

```sh
make generate-app-key
```

### `composer-install`

Install Composer dependencies for the Laravel application.

```sh
make composer-install
```

### `npm-install`

Install npm dependencies for the React frontend.

```sh
make npm-install
```

### `npm-install-package`

Install a specific npm package in the React frontend.

**Note**: You must specify the `package` variable.

```sh
make npm-install-package package=<package-name>
```

### `npm-build`

Build the frontend assets using npm.

```sh
make npm-build
```

### `check-docker-compose-up`

Check if the required Docker services are running.

```sh
make check-docker-compose-up
```

### `migrate`

Run Laravel migrations.

```sh
make migrate
```

### `migrate-fresh`

Run Laravel migrations with a fresh database.

```sh
make migrate-fresh
```

### `migrate-seed`

Run Laravel migrations and seed the database.

```sh
make migrate-seed
```

### `artisan`

Run other Laravel Artisan commands.

**Note**: You must specify the `cmd` variable.

```sh
make artisan cmd=<command>
```

### `import-users`

Import random users into the application using a custom Artisan command.

```sh
make import-users
```

### `up`

Bring up the Docker Compose environment in detached mode.

```sh
make up
```

### `dev`

Bring up the Docker Compose environment with the frontend development server in detached mode.

```sh
make dev
```

### `check-migration`

Check if there are any pending Laravel migrations.

```sh
make check-migration
```

### `down`

Stop the Docker Compose environment.

```sh
make down
```

### `restart`

Restart the Docker Compose environment with the appropriate profile for the services that are running.

```sh
make restart
```

### `clean`

Clean up the generated files and directories including:

- `clean-hot`
- `clean-vendor`
- `clean-node`

```sh
make clean
```

### `clean-hot`

Remove the `./public/hot` file.

```sh
make clean-hot
```

### `clean-vendor`

Remove the `./vendor` directory.

```sh
make clean-vendor
```

### `clean-node`

Remove the `./node_modules` directory.

```sh
make clean-node
```

## Usage

To use any of these targets, simply run `make <target>` in the terminal. For example:

```sh
make up
```

This command will start up the Docker Compose environment in detached mode.
