FROM node:7-alpine@sha256:4954ce53247180e207772f936223b11d52a7e4ee712dfe73fe2a75e39f785067
MAINTAINER Glavin Wiechert <glavin.wiechert@gmail.com>

# Defines our working directory in container
WORKDIR /usr/src/app

COPY package.json ./
RUN npm install

COPY . ./
RUN npm run build

CMD npm run static