FROM node:lts-alpine

COPY /frontend/package*.json .

RUN npm install

COPY /frontend/public/ public/
COPY /frontend/src src/

CMD [ "npm", "run", "start" ]