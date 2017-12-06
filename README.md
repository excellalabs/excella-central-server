# Excella Central Server

## Tech Stack

- LoopBack
- mongoDB (hosted by mLab)
- Docker

## Running the server:

1. Create `.env` file in root directory with:
    - `NODE_ENV=local`
    - `MONGODB_URL=mongodb://<dbuser>:<dbpassword>@ds129946.mlab.com:29946/labs-test` (be sure to replace `<dbuser>` and `<dbpassword>` with database login info)
2. In terminal, run `npm run docker:debug`. This will build the docker image and open up a browser window with the node server info.
3. Add `/explorer` to the end of the URL. You should see the LoopBack API browser.
4. Try doing a GET on the profiles object. You should see the same test user that's listed on https://mlab.com/databases/labs-test/collections/profile.

NOTE: To kill/stop the running docker image, terminate the process and then run `docker stop excella-central-server`.
