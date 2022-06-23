FROM node:18

WORKDIR /next

COPY package*.json yarn.lock ./

RUN yarn install

COPY . /next

EXPOSE 3000

CMD ["yarn", "run", "dev"]
