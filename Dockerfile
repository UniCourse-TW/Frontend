FROM --platform=$BUILDPLATFORM node:lts as builder

RUN npm i -g pnpm
WORKDIR /app
COPY . .
RUN pnpm i
RUN pnpm build

FROM joseluisq/static-web-server

WORKDIR /web
COPY --from=builder /app/dist .

ENV SERVER_ROOT=/web
ENV SERVER_FALLBACK_PAGE=index.html
ENV SERVER_LOG_LEVEL=info
