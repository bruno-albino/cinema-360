FROM node:alpine

WORKDIR /home/node/app

COPY package*.json ./
RUN npm i

COPY . .

EXPOSE 3002

CMD ["yarn", "start:dev"]