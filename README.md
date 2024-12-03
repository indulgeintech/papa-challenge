Here’s the revised and polished version of your submission:

---

# Frank's Papa Challenge Submission

## Description

### Problem Statement
The **"Home Visit Service"** application is designed to facilitate functionality for users—referred to as *members* and *pals*—to create and fulfill home visit requests, respectively. Members initiate visit requests, and pals fulfill these requests, impacting the user's balance, which is measured in minutes. 

The challenge involves implementing a system that handles these interactions efficiently and reliably.

### Solution Overview
The solution was built by creating a few core modules: **Users**, **Auth**, and **Visits**. These modules adhere to software development best practices to ensure scalability and maintainability.

Key highlights of the approach include:

- Leveraging **PostgreSQL**, a highly scalable and feature-rich SQL RDBMS.
- Employing **transactions** to ensure consistency by rolling back changes in case of database errors.
- Utilizing **NestJS**, a mature, TypeScript-first web framework, for robust server-side development.
- Generating **Swagger** API specifications for detailed and developer-friendly documentation.

While the implementation is functional, time constraints limited the scope for testing, which I would typically implement at both unit and end-to-end (e2e) levels for comprehensive coverage.

---

## Video Demo
[HomeVisits.mov](./HomeVisits.mov)

---

## Prerequisites
Ensure the following tools are installed on your system:
-   [Node.js](https://nodejs.org/) 
-   [npm](https://www.npmjs.com/)
-   [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/)
-   [PostgreSQL](https://www.postgresql.org/)

### Recommended Installation Steps
```bash
$ brew install node
$ npm install --global yarn
$ brew install postgresql
```

---

## Installation
Install the dependencies by running:
```bash
$ npm install
```

---

## Pre-Running Configuration
Update the development configuration file to point to your PostgreSQL instance:

**File:** [src/config/configs/config.dev.ts]  
```typescript
import { Dialect } from 'sequelize/types';

export const config = {
    database: {
        dialect: 'postgres' as Dialect,
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.PORT) || 5432,
        username: process.env.DB_USER || 'frankpersonal',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_DATABASE || 'db_6',
        logging: false,
    },
    jwtPrivateKey: 'jwtPrivateKey',
};
```

---

## Running the Application
```bash
# Install dependencies
$ yarn 

# Start the application in development mode
$ npm run start

# Watch mode for development
$ npm run start:dev

# Production mode
$ npm run start:prod
```

---

## Testing
Run the following commands to execute tests:
```bash
# Unit tests
$ npm run test

# End-to-end tests
$ npm run test:e2e
```

---

## Diagrams
Entity-Relationship Diagram:  
![ERD](docs/erd.jpg)

---

## Project Structure
The API is organized by **components/services** rather than technical roles (e.g., controllers, models, routes). This structure enables future scalability, allowing the API to evolve into a microservices architecture if needed. Inter-service communication is handled through APIs rather than direct file access.

Each service is divided into **layers**:
1. **Web Layer**: Handles HTTP requests and responses.
2. **Logic Layer**: Contains business logic.
3. **Data Access Layer**: Manages database interactions.

This layered structure ensures a **separation of concerns (SOC)**, simplifies testing, and makes transitions to other frameworks (e.g., Koa, Hapi) straightforward.

---

## Technologies Used

### 1. Node.js with TypeScript
- Provides type safety and better scalability than plain JavaScript.
- Ideal for rapid development and growing codebases.
- While Node.js was chosen due to time constraints, **Elixir/Phoenix** would be considered in a non-time-sensitive scenario for its high concurrency support.

### 2. PostgreSQL with Sequelize ORM
- Chosen for its ability to handle relational and transactional data efficiently.
- Sequelize abstracts database operations, guards against SQL injection, and accelerates CRUD implementation.
- SQL’s advanced querying capabilities provide a foundation for future analytics and reporting.

---

## API Features
- **Authentication**: Basic token-based authentication for client identification.
- **Documentation**: Comprehensive API documentation via **Swagger** and **JSDoc**.
- **Validation**: Input validation using the `validator` library.
- **Error Handling**: Middleware for token validation and async error handling.
- **Testing**: Tests implemented with **Jest** and Swagger-based e2e tests.

---

This structured approach ensures the application is both functional and scalable, with room for further enhancements.

--- 

Let me know if you'd like additional adjustments!
