# Parkerad

## Setting up

1. Rename `next/.env.example` to `next/.env`
2. In `/next/.env` change `IMG_SRC` to the URI where the images are stored.

### Environment Variables

1. Make a copy of `next/.env.dev` and name it `.env.dev.local`.
2. Populate `next/.env.dev.local` with secretes.
3. Make a copy of `next/prisma/.env.example` and name it `.env`.

## Developing

### Docker

```bash
docker compose up --build
```

### Prisma

When `/next/prisma/prisma.schema` is updated run `yarn prisma generate`.
