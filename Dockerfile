FROM node:latest

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN npm install -g http-server && \
    npm install -g grunt-cli

COPY . /usr/src/app

EXPOSE 8080

CMD [ "http-server" ]

