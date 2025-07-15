# FROM docker.io/node:22.11.0-bullseye-slim AS builder
FROM docker.io/node:22.11.0-bullseye-slim
WORKDIR /app
COPY . .
# COPY package*.json .
# COPY tsconfig.json .
# COPY tsconfig.app.json .
# COPY tsconfig.node.json .
RUN npm i
RUN npm run build
# COPY ./ /app
EXPOSE 3000
# CMD ["npm", "run", "preview"]
CMD ["npm", "run", "dev"]
