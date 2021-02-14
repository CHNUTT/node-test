FROM node:latest

RUN mkdir /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm i npm

COPY . .

EXPOSE 3000

CMD ["npm", "start"]