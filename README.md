<h1>Frank's Papa Challenge Submission</h1>

## Description
### Problem statement
<a few paragraphs describing the problem>
"Home Visit Service" is an application needing to offer funcationality for user's (member's and pals) to create and fufill visits respectively. These home visits are requested by member a pal then fufills 
these visits this changes the user's balance which are measured in minutes.

<a few paragraphs describing how you solved it–focus on the whys here>
The solution was created by creating a few key modules users, auth and visits 
this follows practices of keeping the app in

- the use of PostgresSQL a highly scalable featue rich SQL RDBMS 
- the use of tranasactions for rolling back in case database errors to rollback account changes
- NestJs a mature web framework that's typescript first
- Swagger for creating robust api specs

Due to time contraints I fell short on testing which I generally would have done at the e2e and unit 
level.

## Video Attached of API
[HomeVisits.mov](./HomeVisits.mov)

## Prerequisites
-   [Node.js](https://nodejs.org/) 
-   [npm](https://www.npmjs.com/)
-   [yarn](https://classic.yarnpkg.com/lang/en/docs/install/)
-   [postgres](https://www.postgresql.org/)

### Recommended Install Steps
```bash 
$ brew install node
$ npm install --global yarn
$ brew install postgresql
```
## Installation

```bash
$ npm install
```
## Pre-Running Steps
change [dev confgi](src/config/configs/config.dev.ts) to point to your postgres
```typescript
import { Dialect } from 'sequelize/types';

export const config = {
    database: {
        dialect: 'postgres' as Dialect,
        host:  process.env.DB_HOST || 'localhost',
        port: Number(process.env.PORT) || 5432,
        username: process.env.DB_USER || 'frankpersonal',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_DATABASE || 'db_6',
        logging: false,
    },
    jwtPrivateKey: 'jwtPrivateKey',
};
```
## Running the app

```bash
# Install deps
$ yarn 

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```

## Diagrams 
<img src="docs/erd.jpg"> </img>


## Project Structure
I have gone ahead and structured the api by components/services rather than by technical role (controllers, models, routes).

This will allow us to breakout this api in the future if needed and make sure any service to service access is done so via api rather than underlying files.

Each services contains 'layers' - dedicated for the web, logic, and data access layer (MVC and Data Access Object Pattern) to keep SOC and make testing individual layers easier.

I have made sure to keep things like req, res segmented to the controller and routes layer. If one were to move to another web framework (koa, hapi) it would make an easier shift.


# Technologies Chosen

## Node.js (Typescript)
Quick to get started and grow the codebase typescript sets up type safety quick to get running and allows for the project to scale better than just plain old javascript. I've chosen this tool given time constraints in the interview loop otherwise would have opted for elixir/phoneix to give it a go.

## Database Sequelize (MySQL)
Due to the relational/transactional nature of the data I think SQL is an excellent fit

ORM layer will abstract underlying db, block against SQL injection, and speed up development by giving default CRUD actions

Using SQL will allow for advanced reporting queries something missed with no-sql implementations

Schema will change and expand but we can predict relatively well

# API Bells & Whistles
Auth: Simple auth token to identify clients

Documentation: Swagger, JSDOC

Testing: Jest & e2e api test via swagger

Validator: validator library to validate data at run time

Middleware: Token / Async Wrapper for error handling middleware

Documentation
(Postman & JSDoc): Provides documentation and easy way for developers to start interfacing with application

