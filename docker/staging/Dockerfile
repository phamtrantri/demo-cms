FROM node:12.14.1-alpine as builder

WORKDIR /app

COPY package.json ./
RUN yarn install
COPY . ./
RUN yarn run build:staging

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY --from=builder /app/docker/default.conf /etc/nginx/conf.d/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
