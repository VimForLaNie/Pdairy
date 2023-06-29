FROM node:lts-alpine

COPY ./API/package.json ./
COPY ./API/package-lock.json ./
RUN npm install

COPY ./API/.env ./.env
COPY ./API/index.js ./
COPY ./keys/client.key ./keys/client.key
COPY ./keys/client.crt ./keys/client.crt
COPY ./API/prisma ./prisma
RUN npx prisma generate

RUN npm install @prisma/client

EXPOSE 3000

CMD [ "node", "index.js" ]