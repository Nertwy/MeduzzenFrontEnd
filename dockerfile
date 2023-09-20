FROM oven/bun
WORKDIR /app

COPY package.json .

RUN bun install -g vite



COPY . .

RUN bun install

EXPOSE 5173

CMD [ "bun","run","dev"]