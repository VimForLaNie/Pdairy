FROM node:lts-alpine

COPY ./API/package.json ./
COPY ./API/package-lock.json ./
COPY ./API/tsconfig.json ./
RUN npm install
COPY ./API/prisma ./prisma

RUN npx prisma generate

RUN npm install @prisma/client

COPY ./keys/client.key ./keys/client.key
COPY ./keys/client.crt ./keys/client.crt
COPY ./API/src ./src
# COPY ./.env ./.env

RUN npm run build

CMD [ "npm", "start" ]