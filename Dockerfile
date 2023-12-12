FROM node:20-alpine as build

WORKDIR /app

COPY ./package.json ./yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

RUN rm -r ./node_modules

RUN yarn install --prod

FROM node:20-alpine as production

WORKDIR /app

COPY --from=build /app/package.json ./

COPY --from=build /app/yarn.lock ./

COPY --from=build /app/public ./public

COPY --from=build /app/node_modules ./node_modules

COPY --from=build /app/.next ./.next

COPY .env.local ./

EXPOSE 3000

CMD [ "yarn", "start" ]