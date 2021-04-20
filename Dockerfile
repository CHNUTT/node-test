FROM node:14

RUN mkdir /app

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm i npm

COPY . .

EXPOSE 3000

CMD ["npm", "start"]