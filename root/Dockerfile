FROM node:22-slim

WORKDIR /usr/src/app

ADD *.js .
COPY package*.json .
COPY yarn.lock .
COPY LICENSE .

COPY migrations ./migrations
COPY src ./src

RUN yarn install

CMD [ "yarn", "start"]
