FROM node:lts-alpine

COPY ./API/package.json ./
COPY ./API/package-lock.json ./
COPY ./API/tsconfig.json ./
RUN npm install

COPY ./API/.env ./.env
COPY ./API/src ./src
COPY ./keys/client.key ./keys/client.key
COPY ./keys/client.crt ./keys/client.crt
COPY ./API/prisma ./prisma
RUN npx prisma generate

RUN npm install @prisma/client

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]