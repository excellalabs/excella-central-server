FROM node:8.6-alpine

ENV NPM_CONFIG_LOGLEVEL error

ADD https://github.com/Yelp/dumb-init/releases/download/v1.1.1/dumb-init_1.1.1_amd64 /usr/local/bin/dumb-init
RUN chmod +x /usr/local/bin/dumb-init

RUN mkdir -p /usr/src/app

RUN adduser -S nodejs
RUN chown nodejs: /usr/src/app
USER nodejs
# RUN daemon with `dockerd --userns-remap=nodejs`

WORKDIR /usr/src/app

COPY package.json .
ENV NODE_ENV production
RUN npm install --only=production

ARG MONGODB_URL=mongodb://localhost:27017/labs-test
ENV MONGODB_URL=$MONGODB_URL

ARG EMAIL_LOGIN
ENV EMAIL_LOGIN=$EMAIL_LOGIN

ARG EMAIL_PASS
ENV EMAIL_PASS=$EMAIL_PASS

ENV HOST "0.0.0.0"
ENV PORT 3000
EXPOSE 3000

COPY . .

ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "start"]
