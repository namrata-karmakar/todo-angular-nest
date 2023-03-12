# Stage 1: Compile and Build angular codebase
FROM node:16-alpine as build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve app with nginx server
FROM nginx:stable
COPY --from=build /usr/src/app/dist/ /usr/share/nginx/html
EXPOSE 80
CMD ["npm", "start"]