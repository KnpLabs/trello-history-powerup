FROM nginx:1.17.0-alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY .docker/app/nginx.conf /etc/nginx/nginx.conf

WORKDIR /app

COPY . /app

CMD ["nginx", "-g", "daemon off;"]
