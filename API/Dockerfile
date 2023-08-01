FROM node:lts-alpine

COPY ./API/package.json ./
COPY ./API/package-lock.json ./
COPY ./API/tsconfig.json ./
RUN npm install
COPY ./API/prisma ./prisma
RUN npx prisma generate

RUN npm install @prisma/client

# COPY ./.env ./.env
COPY ./API/src ./src
COPY ./keys/client.key ./keys/client.key
COPY ./keys/client.crt ./keys/client.crt

RUN npm run build

CMD [ "npm", "start" ]