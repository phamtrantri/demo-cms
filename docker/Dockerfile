FROM nginx:alpine
COPY build1 /usr/share/nginx/html
COPY docker/default.conf /etc/nginx/conf.d/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
