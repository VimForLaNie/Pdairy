FROM node:lts-alpine

COPY ./dashboard/static ./static
COPY ./dashboard/package.json ./
COPY ./dashboard/package-lock.json ./
COPY ./dashboard/*.config.ts ./
COPY ./dashboard/*.config.js ./
COPY ./dashboard/tsconfig.json ./
COPY ./dashboard/src/ ./src

# RUN npx smui-theme template src/theme
RUN npm install
RUN npm run prepare
RUN npm run build

CMD [ "node", "/build" ]