ARG PUBLIC_URL
FROM mhart/alpine-node:11 AS builder

WORKDIR /app

COPY package.json   /app/
#RUN cd /app && npm set progress=false && npm install
RUN cd /app && npm install
# Run build
COPY .  /app

RUN cd /app && npm run build


# Prepare nginx server
FROM nginx:alpine
COPY .docker/default.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/build/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
