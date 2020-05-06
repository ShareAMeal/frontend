FROM node:8.10 AS build
WORKDIR /app
COPY package.json .
COPY package-lock.json .
COPY src src
COPY public public

RUN npm install
RUN node ./node_modules/react-scripts/bin/react-scripts.js build
FROM nginx:alpine
COPY --from=build /app/build/* /usr/share/nginx/html/
COPY --from=build /app/build/* /usr/share/nginx/html/static/
RUN gzip -vk9 /usr/share/nginx/html/static/js/* && gzip -vk9 /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/conf.d/default.conf
