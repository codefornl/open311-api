FROM node:4.2.3
RUN apt-get update && apt-get -y install rlwrap sqlite3 socat

RUN mkdir -p /open311-api
WORKDIR /open311-api

ONBUILD COPY package.json /open311-api
ONBUILD RUN npm install
ONBUILD COPY . /open311-api

EXPOSE 3000

CMD [ "npm", "start" ]
