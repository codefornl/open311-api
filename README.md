# Build status

[![Circle CI](https://circleci.com/gh/codeforeindhoven/buurtpreventie-api.svg?style=svg)](https://circleci.com/gh/codeforeindhoven/buurtpreventie-api)
[![David](https://david-dm.org/codeforeindhoven/buurtpreventie-api.svg)](https://david-dm.org/codeforeindhoven/buurtpreventie-api)

# About

Uses:

Node.js, Express, MySQL, Sequelize.

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

    git clone git@github.com:codeforeindhoven/buurtpreventie-api.git
    cd buurtpreventie-api
    npm install .

*Note:* Check that `npm install .` doesn't generate errors. The installation
 process will tell you what components are missing (f.i. mysql)

Create a file called `config.json`

*Note:* you can copy `config.default.json` to `config.json` to get hints on the required variables.

### Run the tests

    npm test

### Run the Application

To start the applicatie in "development mode":

    npm start

To start the application in "production mode":

    export NODE_ENV=production && npm start

Or, using forever:

    NODE_ENV=production /usr/bin/forever start -c "npm start" /path/to/buurpreventie-api/

Point your browser to [http://localhost:3000](http://localhost:3000) to check if the application is running.
