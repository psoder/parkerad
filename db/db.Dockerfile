FROM mongo:5

CMD ["mongod", "--replSet", "rs0"]