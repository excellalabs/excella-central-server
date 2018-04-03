# Excella Central Server [![Build Status](https://travis-ci.org/excellalabs/excella-central-server.svg?branch=master)](https://travis-ci.org/excellalabs/excella-central-server) [![Waffle.io - Columns and their card count](https://badge.waffle.io/excellalabs/excella-central.svg?columns=all)](https://waffle.io/excellalabs/excella-central)

Excella Central is a project developed by the JavaScript Specialty Area of Excella Labs. The purpose is to bring Excellians together, familiarizing employees with each other in a fun & interactive way. Using Ionic Pro, we have created a native in-house mobile app for iOS & Android, as well as a Progressive Web App (which can be found at https://central.excellalabs.com).

This Node server works in conjunction with our Ionic front-end at https://github.com/excellalabs/excella-central.

## Technology Stack

- LoopBack
- MongoDB (hosted by mLab)
- Docker
- AWS ECS
- Travis CI

## Prerequisites

- Install [Node LTS](https://nodejs.org/en/)
- Ensure Node & NPM installed correctly (by running `node -v` and `npm -v` in a command shell)

## Development

1. Create a `.env` file in root directory with:
    - `NODE_ENV=local`
    - `MONGODB_URL=mongodb://<dbuser>:<dbpassword>@ds129946.mlab.com:29946/labs-test` (be sure to replace `<dbuser>` and `<dbpassword>` with database login info)
2. In terminal, run `npm run docker:debug`. This will build the docker image and open up a browser window with the Node server.
3. Add `/explorer` to the end of the URL. You should see the LoopBack API Explorer.
4. Before running any queries against the database, you will have to authenticate yourself via the Login API:
    1. Find the `/accounts/login` API in the Explorer and click on it to expand.
    2. In the "credentials" input box, enter your email & password within a JSON object (i.e. `{ "email": "test@email.com", "password": "testPassword" }`).
    3. If login was successful, copy the "id" value from the Response Body and paste it in the "accessToken" input box at the top of the screen. Click "Set Access Token"; you should now be authenticated!
5. Once you've completed step 4, try running a GET against the `/profiles` object. If you receive data in the Response Body, then you are ready to start contributing!

NOTE: To kill/stop the running docker image, terminate the process and then run `docker stop excella-central-server`.
