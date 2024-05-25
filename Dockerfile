FROM node:21-alpine

ARG DATABASE_URL
ARG MINIO_URL
ARG MINIO_ACCESS_KEY
ARG MINIO_PRIVATE_KEY

ENV DATABASE_URL=$DATABASE_URL
ENV MINIO_URL=$MINIO_URL
ENV MINIO_ACCESS_KEY=$MINIO_ACCESS_KEY
ENV MINIO_PRIVATE_KEY=$MINIO_PRIVATE_KEY

WORKDIR /app

# Yarn Berry 설치
RUN yarn set version berry

RUN yarn -v

COPY .yarn .yarn
COPY .yarnrc.yml .yarnrc.yml
COPY package.json .
COPY yarn.lock .

RUN yarn install
RUN cat package.json
RUN ls 
RUN ls packages/lib/db

COPY . .

EXPOSE 3000
EXPOSE 3001

RUN yarn build

CMD yarn start
