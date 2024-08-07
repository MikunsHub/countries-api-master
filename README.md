# Countries API

## Overview

This project implements a REST API using TypeScript and Node.js, integrating data from the REST Countries API. The API provides various endpoints to retrieve and process country data, including details on regions, languages, and aggregated statistics.

## Features

- **Data Integration:** Fetches and processes data from the REST Countries API.
- **API Endpoints:**
  - `GET /api/countries`: Retrieve a list of countries with pagination and optional filtering by region or population size.
  - `GET /api/countries/:id`: Retrieve detailed information for a specific country, including its languages, population, area, and bordering countries.
  - `GET /api/regions`: Retrieve a list of regions and the countries within each region, with additional aggregated data such as the total population of the region.
  - `GET /api/languages`: Retrieve a list of languages and the countries where they are spoken. Include the total number of speakers globally for each language.
  - `GET /api/statistics`: Provide aggregated statistics such as the total number of countries, the largest country by area, the smallest by population, and the most widely spoken language.
- **Data Processing:** Efficiently stores and manages fetched data, with features for filtering, searching, and sorting.
- **Security:** Protects the API against common web vulnerabilities.
- **Performance:** Implements caching strategies to enhance performance and handle concurrent requests efficiently.
- **Documentation:** Comprehensive API documentation using Swagger/OpenAPI.
- **Additional Features:** Logging for tracking API usage and debugging, along with unit and integration tests for the API endpoints.

## Setup

### Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/MikunsHub/countries-api-master.git
cd countries-api-master
```

2. Install dependencies:
```bash
npm install
```
3. Set up environment variables
```bash
NODE_ENV=
PORT=
ALLOWED_ORIGINS=

DATABASE_HOST=
DATABASE_PORT=
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_NAME=
DATABASE_SSL=

JWT_SECRET=your_jwt_secret_here

REDIS_HOST=
REDIS_PORT=
REDIS_PASSWORD=
```

Running the 
Start up the docker container, to have access to a Postgres and Redis instance
```bash
docker-compose -f docker-compose.yml up -d
```

### Implementation Details
#### Approach

1. Data Ingestion
- Created a script (data-ingestion.ts) to fetch data from the REST Countries API using axios.
- Processed and stored the fetched data using TypeORM to interact with a PostgreSQL database.
- Ensured data consistency and handled missing or incomplete data during the ingestion process.
- Added a command in the package.json file to run the data ingestion script before deployment:
```json
"scripts": {
  ...
  "dataIngestion": "ts-node src/scripts/data-ingestion.ts",
  ...
}
```
To run the data ingestion script:
```bash
npm run dataIngestion
```
2. API Design:
- Implemented pagination, filtering, and sorting features to enhance usability.
3. Security and Performance:
- Applied best practices to secure the API, including input validation and error handling.
4. Implemented caching strategies using cache-manager and Redis to improve performance.
5. Documentation:
- Used Swagger to document the API, providing clear and comprehensive information on each endpoint.

### Deployment
#### Render Deployment
The application is deployed on Render using their free instance. Due to the limitations of the free instance, Render does not support running pre-deployment commands. As a workaround, to run database migrations before starting the application in production, the start:production command in the package.json file is edited to include the migration command.

Here are the relevant scripts in the package.json file:
```json
"scripts": {
  ...
  "start:prod": "node dist/main",
  "start:production": "npm run migration:run && npm run start:prod",
  ...
}
```
Steps to Deploy
1. Build the Application:
This is part of the build step deployment settings on render

```bash
npm run build
```

2. Edit start:production Command:
To run migrations before starting the application, edit the start:production command.

```json
"start:production": "npm run migration:run && npm run start:prod"
```
3. Deploy to Render:
Push the changes to your GitHub repository connected to Render. Render will automatically deploy the application.

4. Run Migrations:
After deployment, if there are database schema changes, update the start:production command temporarily to run migrations.

```bash
npm run start:production
```
5. Revert start:production Command:
After migrations have run successfully, revert the start:production command back to just starting the application.

```json
"start:production": "npm run start:prod"
```
This approach ensures that the necessary database migrations are run without requiring pre-deployment commands, adhering to the constraints of the Render free instance. This also works if you want to run a downgrade on a migration file

### Accessing the Deployed API
The deployed API can be accessed at the following URL:

- API URL: https://countries-api-master.onrender.com

By following these steps, deployments can be managed efficiently and database migrations effectively on Render, even with the limitations of the free instance.