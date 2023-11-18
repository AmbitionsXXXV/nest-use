FROM node:18.0-alpine3.14 as build-stage

WORKDIR /app

COPY package.json .

RUN npm install pnpm -g

RUN pnpm install

COPY . .

RUN pnpm --filter nest-docker-compose build

# production stage
FROM node:18.0-alpine3.14 as production-stage

COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/package.json /app/package.json

WORKDIR /app

RUN pnpm install --production

EXPOSE 3000

CMD ["node", "/app/main.js"]
