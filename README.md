# csv-processing-api

## Overview

This project is developed to solve Problem solving case with a csv file that keeps a record of n order details for orders made at an online
shopping website

## How to build and start the server

The project can be built and run in the following ways

### 1. Install all dependencies

`yarn`

### 2. Build

`yarn build`

This command will build the typeScript code into JavaScript and save them in the `./build` folder.

### 3. Start the Server

`yarn start`

This command will start the server running on port `3000`.

It will create 2 csv files with sampleData right after the server starts

- to test the processing of these data, you need to run the endpoint, either in the browser or inside the terminal

## Endpoint

### `/api/csv/`

Method: `get`

    From the browser: `localhost:3000/api/csv/`

#### run endpoint in terminal

    to run the endpoint inside the terminal to process the data run: `curl localhost:3000/api/csv/`

## Testing

Here, I will show you how to run the test.

### 2. Testing

`yarn test`

- for the tests to run and succeed you have to keep the two sample files empty/filled (either way in the test they will be overwritten) inside the csvFiles folder, because we need the csvFiles directory in the build file for the tests to work!

### Functionality

- User can create csv files from array of objects using createCSVFile function.
- User can process csv files created and get output created in new csv files with the processCSVData function.

## Built With

- [NodeJS](https://nodejs.org/en/) - The JavaScript runtime.
- [Express](https://expressjs.com/) - The web framework.
- [TypeScript](https://www.typescriptlang.org/) - The language used.
- [CSV](https://csv.js.org//) - CSV Nodejs suite.
