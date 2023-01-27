FROM node:16-alpine as BOB
WORKDIR /opt/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build
RUN yarn install --prod --frozen-lockfile --prefer-offline

FROM node:16-alpine
WORKDIR /opt/app
COPY --from=BOB /opt/app/dist ./dist
COPY --from=BOB /opt/app/node_modules ./node_modules
COPY package.json yarn.lock ./
CMD ["yarn","start"]