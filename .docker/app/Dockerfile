FROM node:11.15.0-alpine

WORKDIR /app
RUN chown 1000:1000 /app

USER 1000

COPY --chown=1000:1000 .env.dist .env
COPY --chown=1000:1000 . /app

RUN yarn install

CMD ["yarn", "run", "start"]
