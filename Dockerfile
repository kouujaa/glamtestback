FROM alpine:3.9

ENV NODE_VERSION 12.18.0

WORKDIR /usr/app

COPY package.json .

RUN apk add --update npm

RUN rm -rf node_modules

RUN npm i --quiet

COPY . .


RUN npm install pm2 -g

RUN npm run build

CMD ["pm2-runtime", "./build/index.js"]