FROM oven/bun:1.2.15

WORKDIR /app

COPY package.json bun.lock ./

RUN bun install

COPY . .

RUN bun build --compile --minify --sourcemap ./src/index.ts --outfile myapp

EXPOSE 3000

CMD ["myapp"]