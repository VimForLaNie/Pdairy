FROM node:lts-alpine

COPY ./dashboard/static ./static

COPY ./dashboard/package.json ./
COPY ./dashboard/package-lock.json ./
RUN npm install

COPY ./dashboard/*.config.ts ./
COPY ./dashboard/*.config.js ./
COPY ./dashboard/tsconfig.json ./
COPY ./dashboard/src/ ./src
RUN npm run build

CMD [ "node", "/build" ]