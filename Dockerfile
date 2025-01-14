FROM node:22-alpine

WORKDIR /app
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    libc6-compat \
    openssl
COPY package.json package-lock.json ./
COPY prisma ./prisma/
COPY . .
RUN npx prisma generate
EXPOSE 5000

CMD ["npm", "run", "dev"]
