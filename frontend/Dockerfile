#Dockerfile Multi-Stage
# Build frontend with Node.js
FROM node AS build
WORKDIR /app
COPY . .
RUN npm install --verbose
RUN npm run build

# use frontend and conf. proxy with NGINX
FROM nginx:latest
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

# cypress
FROM cypress/base:16.16.0
RUN mkdir -p /app
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npx cypress verify
CMD ["npx", "cypress", "run"]
