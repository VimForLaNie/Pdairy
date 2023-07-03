FROM node:lts-alpine

COPY ./dashboard/static ./static

COPY ./dashboard/package.json ./
COPY ./dashboard/package-lock.json ./
RUN npm install

COPY ./dashboard/vite.config.ts ./
COPY ./dashboard/tsconfig.json ./
COPY ./dashboard/svelte.config.js ./
COPY ./dashboard/src/ ./src
RUN npm run build

CMD [ "npm", "run", "preview" ]