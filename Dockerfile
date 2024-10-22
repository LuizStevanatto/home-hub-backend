FROM node:18-alpine3.17

RUN apk add --no-cache bash

RUN npm install -g @nestjs/cli@9.0.0

# USER node

COPY package-lock.json ./

WORKDIR /home/node/app
