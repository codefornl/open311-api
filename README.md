# Build status

[![Travis](https://travis-ci.org/codefornl/open311-api.svg?branch=master)](https://travis-ci.org/codefornl/open311-api)
[![David](https://david-dm.org/codefornl/open311-api.svg?path=src)](https://david-dm.org/codefornl/open311-api?path=src)

# About

Uses:

Node.js, Express, Sequelize.

## Requirements

* [NodeJS & NPM](http://nodejs.org/download)
* Git

### Windows specifics
* [Python (version 2.7)] (https://www.python.org/download/releases/2.7.6/) Windows: add PYTHON system variable pointing to the full path to python.exe.
* Microsoft Visual Studio C++
* You can also install [Visual Studio Community] (https://www.visualstudio.com/products/visual-studio-community-vs) containing all requirements.
* Restart Windows after altering system variables.

## Installation

From a console or terminal:

    git clone git@github.com:codefornl/open311-api.git
    cd open311-api
    npm install .

Make sure you have a mysql database available

Create a file called `config.json`

*Note:* you can copy `config.default.json` to `config.json` to get hints on the required variables.

Make sure you have the correct mysql credentials set up for your local mysql installation. The scripts will not
create any databases so make sure you have created the required databases before starting or running tests

### Run the tests

    npm run migrate:test
    npm run seed:test
    npm test

### Run the Application

To start the application in "development mode":

    npm start

To start the application in "production mode":

    export NODE_ENV=production && npm start

Or, using forever:

    NODE_ENV=production /usr/bin/forever start -c "npm start" /path/to/open311-api/

Point your browser to [http://localhost:3000/api/v2/services.json](http://localhost:3000/api/v2/services.json) to check if the application is running.
