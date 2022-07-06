FROM node:14-alpine

WORKDIR /usr/app

RUN yarn global add pm2

COPY package.json .

RUN yarn

COPY . .

CMD ["pm2-runtime", "npm", "--", "start"]