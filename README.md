# Random User Demo

Thank you for checking out this project.

To get started you will need the GNU `make` utility and Docker Desktop installed and running
with `docker-compose` and ports `80` & `5173` available.

## Setup

The default Makefile target init: will take care of first run configuration tasks such as installing dependencies and building the Frontend.

Run these three commands to start the app for the first time.

 - `make`
 - `make up`
 - `make migrate`

The app should now be available at http://localhost/

## Development Environment

### Frontend HMR Development Server

To run the Vite development server for HMR reloading of PHP & JavaScript
during development substitute `make dev` for `make up`.

### Frontend Build Command
To build new bundles of Frontend assets after development is finished run `make npm-build`.

# Full Makefile Target Reference
### **Commands**

#### `init`
Sets up the application for the first time by running:
- `composer-install`
- `npm-install`
- `copy-env-example`
- `generate-app-key`
- `npm-build`

#### `copy-env-example`
Copies the `.env.example` file to `.env` if it does not exist.

#### `generate-app-key`
Generates the Laravel application key using `php artisan key:generate`.

#### `composer-install`
Installs Composer dependencies using `composer install`.

#### `npm-install`
Installs Node.js dependencies using `npm install`.

#### `npm-build`
Builds the frontend assets using `npm run build`.

#### `check-docker-compose-up`
Checks that all required services (`app`, `caddy`, `mysql`) are running with `docker-compose ps`. If any service is not running, it provides an error message.

#### `migrate`
Runs Laravel migrations (`php artisan migrate`) to apply pending migrations.

#### `migrate-fresh`
Resets the database and runs all migrations from scratch using `php artisan migrate:fresh`.

#### `migrate-seed`
Runs migrations and seeds the database using `php artisan migrate --seed`.

#### `artisan`
Runs any given Artisan command. Example usage: `make artisan cmd="cache:clear"`.

#### `up`
Brings up the Docker Compose environment in the background (`docker-compose up -d`) and checks for pending migrations.

#### `dev`
Brings up the Docker Compose environment with the frontend development server (`docker-compose --profile frontend up -d`) and checks for pending migrations.

#### `check-migration`
Checks the status of migrations, waits for the app to be ready, and provides a warning if there are any pending migrations. It recommends running `make migrate` or `make migrate-seed` to apply them.

#### `down`
Stops the Docker Compose environment, including the frontend profile if running (`docker-compose --profile frontend down`).

#### `restart`
Restarts the Docker Compose environment. If the `node` service is running, it restarts with the frontend profile. Otherwise, it restarts normally without the frontend profile.

---

You can use the commands by running `make <command>` from the command line.

Example:
```bash
make              # Initialize the app
make dev          # Start development environment
make migrate      # Apply migrations
make restart      # Restart the environment
