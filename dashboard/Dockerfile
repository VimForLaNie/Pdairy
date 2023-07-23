FROM node:lts-alpine

COPY ./dashboard/static ./static
# COPY ./.env ./.env
COPY ./dashboard/package.json ./
COPY ./dashboard/package-lock.json ./
COPY ./dashboard/*.config.ts ./
COPY ./dashboard/*.config.js ./
COPY ./dashboard/tsconfig.json ./
# COPY ./API/prisma/ ./prisma
COPY ./dashboard/src/ ./src

# RUN npx smui-theme template src/theme
RUN npm install
# RUN npx prisma generate
# RUN npm install @prisma/client

# RUN npx prisma db pull
# RUN npx prisma generate
# RUN npm run prepare
RUN npm run build

CMD [ "node", "/build" ]