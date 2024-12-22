FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY src ./src

RUN npm install

EXPOSE 3000

ENV NODE_ENV=production

CMD [ "node", "./src/server.js" ]