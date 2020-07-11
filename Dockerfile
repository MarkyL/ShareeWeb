FROM node:10.15.2
WORKDIR /sharee-website

COPY package.json .

RUN npm install

ADD . .

CMD ["npm", "run", "start"]
