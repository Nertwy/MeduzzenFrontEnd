FROM oven/bun
WORKDIR /app

COPY package.json .

RUN bun install -g vite

RUN bun install

COPY . .


EXPOSE 5173

CMD [ "bun","run","dev"]