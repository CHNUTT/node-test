FROM node:alpine3.13

RUN mkdir /app

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm i npm

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]