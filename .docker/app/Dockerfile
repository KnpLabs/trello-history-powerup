FROM node:11.15.0-alpine

WORKDIR /app
RUN chown 1000:1000 /app

USER 1000

COPY --chown=1000:1000 package.json package.json
COPY --chown=1000:1000 yarn.lock yarn.lock

RUN yarn install

COPY --chown=1000:1000 .env.dist .env
COPY --chown=1000:1000 public/ public/
COPY --chown=1000:1000 views/ views/
COPY --chown=1000:1000 server.js server.js

CMD ["yarn", "run", "start"]
