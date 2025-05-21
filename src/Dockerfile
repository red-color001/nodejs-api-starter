FROM node:22-slim

WORKDIR /usr/src/app

ADD *.js .
COPY package*.json .
COPY yarn.lock .

COPY config ./config
COPY controllers ./controllers
COPY middleware ./middleware
COPY models ./models
COPY routes ./routes

RUN yarn install

CMD [ "yarn", "start"]
