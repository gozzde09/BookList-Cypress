
FROM node:16 AS backend
WORKDIR /app
COPY package*.json ./
RUN npm install --verbose
RUN npm run tsc
COPY . .
EXPOSE 3000
ENTRYPOINT ["node", "index.js"]
