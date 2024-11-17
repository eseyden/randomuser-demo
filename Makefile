# Laravel, Docker and React App Makefile

# Variables
SHELL = /bin/sh
DOCKER_COMPOSE = docker-compose
APP_SERVICE = app
NODE_SERVICE = node
REQUIRED_SERVICES = app caddy mysql

# Fresh checkout make target, prep app for running
init: composer-install npm-install copy-env-example generate-app-key npm-build
	@echo "Initialization complete! Start app with 'make up'."

copy-env-example:
	@echo "Configuring environment..."
	@if [ ! -f .env ]; then \
		cp .env.example .env; \
	fi

generate-app-key:
	@echo "Generating app key..."
	@$(DOCKER_COMPOSE) run --rm $(APP_SERVICE) php artisan key:generate

composer-install:
	@echo "Installing composer dependencies..."
	@$(DOCKER_COMPOSE) run --rm $(APP_SERVICE) composer install

npm-install:
	@echo "Installing npm dependencies..."
	@$(DOCKER_COMPOSE) run --rm $(NODE_SERVICE) npm install

npm-build:
	@echo "Building frontend assets..."
	@$(DOCKER_COMPOSE) run --rm $(NODE_SERVICE) npm run build

# Check to see if services are running so we don't run dev commands without the services up.
check-docker-compose-up:
	@for service in $(REQUIRED_SERVICES); do \
		$(DOCKER_COMPOSE) ps $$service | grep "Up" > /dev/null 2>&1 || \
		(echo "Error: Service '$$service' is not running. Please start it with 'make up'." && exit 1); \
	done

# Run Laravel migrations
migrate: check-docker-compose-up
	@$(DOCKER_COMPOSE) exec $(APP_SERVICE) php artisan migrate

# Run Laravel migrations with a fresh database
migrate-fresh: check-docker-compose-up
	@$(DOCKER_COMPOSE) exec $(APP_SERVICE) php artisan migrate:fresh

# Run Laravel migrations and seed the database
migrate-seed: check-docker-compose-up
	@$(DOCKER_COMPOSE) exec $(APP_SERVICE) php artisan migrate --seed

# Run other Artisan commands
artisan: check-docker-compose-up
	@$(DOCKER_COMPOSE) exec $(APP_SERVICE) php artisan $(cmd)

# Bring up the Docker Compose environment
up:
	@$(DOCKER_COMPOSE) up -d
	$(MAKE) check-migration

# Bring up the Docker Compose environment with frontend dev server
dev:
	@$(DOCKER_COMPOSE) --profile frontend up -d
	$(MAKE) check-migration

# Check to see if there are migrations that need to be run and give a friendly warning
check-migration:
	@while ! docker-compose exec $(APP_SERVICE) php artisan migrate:status > /dev/null 2>&1; do \
		echo "Waiting for app to be ready..."; \
		sleep 2; \
	done
	@echo "App is up!"
	@PENDING_MIGRATIONS=$$( $(DOCKER_COMPOSE) exec $(APP_SERVICE) php artisan migrate:status | awk '$$3 == "Pending" {print $$0}'); \
	if [ -n "$$PENDING_MIGRATIONS" ]; then \
		echo "Warning: There are pending migrations!"; \
		echo "$$PENDING_MIGRATIONS"; \
		echo "Please run 'make migrate' or 'make migrate-seed' to apply them."; \
	fi

# Stop the Docker Compose environment
down:
	@$(DOCKER_COMPOSE) --profile frontend down

# Restart the Docker Compose environment with the correct profile for the services that are running.
restart:
	@$(DOCKER_COMPOSE) ps node | grep "Up" > /dev/null 2>&1 && \
		$(DOCKER_COMPOSE) --profile frontend down && $(DOCKER_COMPOSE) --profile frontend up -d  || \
		$(DOCKER_COMPOSE) down && $(DOCKER_COMPOSE) up -d

