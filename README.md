# WayFarer
#### [![Build Status](https://travis-ci.org/Baystef/WayFarer.svg?branch=develop)](https://travis-ci.org/Baystef/WayFarer) [![Coverage Status](https://coveralls.io/repos/github/Baystef/WayFarer/badge.svg?branch=develop)](https://coveralls.io/github/Baystef/WayFarer?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/848a9fc1f8e0feb9c30f/maintainability)](https://codeclimate.com/github/Baystef/WayFarer/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/848a9fc1f8e0feb9c30f/test_coverage)](https://codeclimate.com/github/Baystef/WayFarer/test_coverage)

WayFarer is a public bus transportation booking server. It makes it  unbelievably easy for a user to book a bus trip from the comfort of their homes, school, church, etc.

# Introduction

Welcome to version 1 of the WayFarer public bus transportation booking server. Below is a current list of available methods on different endpoints.

# Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Technologies
- Express
- Mocha & Chai
- ESLint
- Babel
- Travis CI
- Code Climate
- Coveralls

## Prerequisites

To work with this project, you need to have the following setup on your local machine

1. [NodeJS](https://nodejs.org)
2. [Git](https://git-scm.com/downloads)
3. [Postman](https://www.getpostman.com/downloads)

## Install and run locally

```bash
$ git clone https://github.com/Baystef/WayFarer.git
$ cd WayFarer

$ npm i
$ npm run migrate:seed 
$ npm run start:dev
```

# Pivotal Tracker ID

https://www.pivotaltracker.com/n/projects/2358838

# API Usage


```js
// login as admin
{
  email: "admin@wayfarer.com",
  password: "wayfarer10"
}

// login as user
{
  email: "wick@gmail.com",
  password: "whykilmydog12"
}
```

API BASE URL https://wayfarer-service.herokuapp.com/. It is recommended to attach an `authorization` Header containing the generated `token` from `/api/v1/auth/signin` to access all routes. It should be added as `"Bearer token"`

## Authentication endpoints `/api/v1/auth`

| method | route        | description               | data                                          |
| ------ | ------------ | ------------------------- | ----------------------------------------------|
| POST   | /auth/signup | Sign Up                   | `{first_name, last_name, email, password}`    |
| POST   | /auth/signin | Sign In                   | `{email, password}`                           |



## Booking endpoints `/api/v1/bookings`

| method | route          | description             | data                                 |
| ------ | -------------- | ----------------------- | ------------------------------------ |
| POST   | /bookings      | Create a booking        |   `{trip_id, seat_number}`           |
| GET    | /bookings      | Get all bookings        |                                      |
| DELETE | /bookings/:booking_id | Delete a booking |                                      |
| PATCH  | /bookings/:booking_id | Change already booked seat number | `{seat_number}`     |



## Bus endpoint `/api/v1/buses`

| method | route            | description          | data                            |
| ------ | ---------------- | -------------------- | ------------------------------- |
| POST   | /buses           | Add a bus |  `{number_plate, manufacturer, year, model, capacity}`|
           

## Trip endpoints `/api/v1/trips`

| method | route          | description             | data                                 |
| ------ | -------------- | ----------------------- | ------------------------------------ |
| POST   | /trips      | Create a trip  |`{ bus_id, origin, destination, trip_date, fare}` |
| GET    | /trips         | Get all trips           |                                      |
| GET    | /trips?origin  | Get trips filtered by origin           |                       |
| GET    | /trips?destination  | Get trips filtered by destination |                       |
| PATCH  | /trips/:trip_id | Cancel a trip          |                                      |



## Admin only endpoints 

| method | route            | description               | 
| ------ | -----------------| ------------------------- |
| POST   | /api/v1/buses    | Add a bus                 |
| POST   | /api/v1/trips    | Create a trip             |
| PATCH  | /api/v1/trips/:trip_id | Cancel a trip       |




# API Docs
https://wayfarer-service.herokuapp.com/api/v1/docs
# App URL
https://wayfarer-service.herokuapp.com/
# Author
Daramola Adebayo
# LICENSE
The code in this project is licensed under MIT license.
