# COREABLE

## Getting Started

1. Install the project dependancies by opening a terminal in the projects directory and `npm install`
2. Change directories to the react folder and install the dependancies with `npm install` 
3. Install the Google Cloud SDK Command Line Interface tools with `curl https://sdk.cloud.google.com | bash`

###### terminal 

```bash
git clone https://github.com/coreable/coreable.git
cd coreable
npm install
cd react
npm install
curl https://sdk.cloud.google.com | bash
```

## Creating a local MySQL instance for development

While developing and working on the coreable API or Web SPA it may be necessary to start an instance of MySQL server to avoid remote connections to the cloud. Running the API in development mode will use the database settings specified in the development object of the `/api/env/development.env` file.

Make sure the credentials in the `/api/env/development.env` correctly match the credentials in the `/docker-compose.yml` file in the root directory.

To begin a MySQL server, open the terminal and being a docker container with `docker-compose up -d`. This will use the docker-compose.yml file as a configuration to being the database service.

**NOTE**: Docker must be installed.

###### terminal

```bash
cd coreable
docker-compose up
```

The database is ready for connection.

## Building for Development

### API

In the root directory of the repository run in the terminal `npm run api:dev`. 

Running the API in development mode with a MySQL server on localhost specified in the config.json file will fill the database with generated data for testing purposes. 


### React

In the root directory of the repository run in the terminal `npm run react:dev`

### Documentation

In the root directory of the repository run in the terminal `npm run docz:dev`

## Building for Production

### API

In the root directory of the repository run in the terminal `npm run api:build`

This will compile all the files in the `/api/` directory, excluding the mocha & chai tests, to the output directory of `/dist/`. 

### React

In the root directory of the repository run in the terminal `npm run api:build`

This will compile all the files in the `/react/src/` and `/react/public` directory, excluding the tests, to the output directory of `/dist/public`. 

### Documentation

In the root directory of the repository run in the terminal `npm run docz:build`

This will compile all the files in the `/docs/` directory to the output directory of `/dist/docs`. 

## Running Unit Tests

### API

In the root directory of the repository run in the terminal `npm run api:test`

### React

In the root directory of the repository run in the terminal `npm run react:test`

### Documentation

Docz don't need testing

## Deploying to Google Cloud

Make sure the application does not crash at run time for any reason. **IMPORTANT**!

In the root directory of the repository run in the terminal `npm run deploy`. **THIS WILL TAKE SOMET TIME**. Be prepared to wait 20 minutes!

In the root directory of the repository in the terminal run `npm run deploy` this will remove the `/dist` folder then will compile the react application, API and documentation all to the `/dist/` folder and upload it to Google Cloud.


## If docker-compose says the port is already in use

###### terminal

```bash
docker-compose down
docker rm -fv $(docker ps -aq)
```