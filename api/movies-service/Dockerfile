FROM node:alpine

WORKDIR /home/node/app

COPY package*.json ./
RUN npm i

COPY . .

EXPOSE 9001

CMD ["yarn", "start:dev"]