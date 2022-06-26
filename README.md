# Parkerad

## Setting up

1. Rename `.env.example` to `.env`
2. Rename `next/.env.example` to `next/.env`
3. In `/next/.env` change `IMG_SRC` to the URI where the images are stored.

### Using Prisma

When `/next/prisma/prisma.schema` is updated run `yarn prisma generate`.
