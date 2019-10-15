FROM node:12.12.0-alpine

RUN mkdir /app
WORKDIR /app
COPY ["tsconfig.json" , "cucumber.js", "package.json", "./"]
RUN npm install
COPY ./src ./src
COPY ./tests ./tests


CMD npm run start
