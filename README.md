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