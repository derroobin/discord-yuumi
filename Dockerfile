FROM node:16-alpine as BOB
WORKDIR /opt/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build
RUN yarn install --prod --frozen-lockfile --prefer-offline

FROM node:16-alpine
RUN adduser -D node
USER node
WORKDIR /opt/app
COPY --from=BOB --chown=node /opt/app/dist ./dist
COPY --from=BOB --chown=node /opt/app/node_modules ./node_modules
COPY --chown=node package.json yarn.lock ./


CMD ["yarn","start"]