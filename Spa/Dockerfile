FROM node:lts-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:lts-alpine as publish
RUN npm install -g angular-http-server
WORKDIR /Spa
COPY --from=build /app/dist/Spa ./
EXPOSE 4200
ENTRYPOINT angular-http-server -p 4200