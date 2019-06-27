FROM node:11.10.0-alpine as prod

WORKDIR /app
RUN chown 1000:1000 /app

USER 1000

CMD ["yarn"]

COPY --chown=1000:1000 package.json package.json
COPY --chown=1000:1000 yarn.lock yarn.lock

RUN yarn install

RUN yarn run build

CMD ["yarn", "run", "server"]
