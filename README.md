# Social Media App created using Apollo GraphQL frameworks

[![Build Status](https://travis-ci.com/ajithpmohan/social-media-app.svg?branch=main)](https://travis-ci.com/ajithpmohan/social-media-app)

## Tech Stack

* Node.js
* Apollo GraphQL
* Apollo Federation (microservices)
* React.js (Apollo Client)
* Express.js
* MongoDB & Mongoose

## Usage

Download the repository:

    git clone git@github.com:ajithpmohan/social-media-app.git

## System Requirements

You need **MongoDB** for running this project. MongoDB can either install [locally](https://linuxize.com/post/how-to-install-mongodb-on-ubuntu-20-04/) or try it from cloud platform [Atlas](https://www.mongodb.com/cloud/atlas). If you are using atlas cloud, create seperate databases for both **account** & **feed** services and replace `DATABASE_URL` environment variable (check .env file inside account & feed services) with newly created database url from atlas. Click [here](https://docs.atlas.mongodb.com/getting-started/) for References.

## Install Dependencies from repo root directory

    npm install

## Concurrently run all Services

    npm run start-services

## Run Apollo Gateway on another terminal

	npm run start-gateway

## Access the services in the development mode.

Open [http://localhost:5000/graphql](http://localhost:5000/graphql) to view server side in the browser.

Open [http://localhost:5003](http://localhost:5003) to view client side in the browser.
