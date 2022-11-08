<!-- <p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p> -->


# Treblle's NestJS API boilerplate

## Description

A boilerplate for your next Typescript based API. It's goal is to simply kick-start your API development and provide you with some of the best practices when building amazing and scalable REST APIs. 🔥

Using:
- yarn
- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/) with [Postgres](https://www.postgresql.org/)
- [Treblle](https://treblle.com/)
- JWT Authentication

## Installation

```bash
yarn
```

## Setup
Make sure you have Postgres database running, as well as your Treblle credentials. Here are the required environment variables for running this application. Add them to your `.env` file.
```bash
# Postgres details
DATABASE_HOST=
DATABASE_PORT=
DATABASE_USERNAME=
DATABASE_PASSWORD=
DATABASE_NAME=

# Seed initial user details for login
INITIAL_USER_NAME=
INITIAL_USER_EMAIL=
INITIAL_USER_PASSWORD=

# String secret for generating JWTs
JWT_SECRET=

# Treblle account information: treblle.com
TREBLLE_API_KEY=
TREBLLE_PROJECT_ID=
```

## Before running the app
Migrate with this shortcut to add required entities to your Postgres database. Check [TypeORM docs here](https://typeorm.io/migrations#running-and-reverting-migrations) for more features.

```bash
yarn typeorm:run-migrations
```


## Running the app

```bash
# Development
yarn start

# Watch mode
yarn start:dev

# Production mode
yarn start:prod
```

## Other features
### NestJS features
This is build upon a NestJS init project following practices from the official documentation, so check [their awesome docs](https://docs.nestjs.com/) to learn more! All default NestJS features should work as expected, as well as the CLI.

### TypeORM migrations
To generate a new migration after adding your entity, you can just run the following:
```bash
yarn typeorm:generate-migration ./src/database/migrations/Create<EntityName>
```
There are also shortcuts for other TypeORM CLI commands, like:
```bash
# Runs all migrations
yarn typeorm:run-migrations

# Creates a new migration file
yarn typeorm:create-migration ./src/database/migrations/<MigrationName>

# Reverts the last migration
yarn typeorm:revert-migration
```
Directory `src/database/migrations` is used for migrations by default.
Don't forget to add your migrations into `DatabaseModule` after creating them, or else they won't be run!

## License
Copyright 2022, Treblle Limited. [MIT licensed](LICENSE).
