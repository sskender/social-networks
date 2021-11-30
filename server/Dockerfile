FROM node:16-buster as server

WORKDIR /opt/app
RUN chown -R node:node /opt/app

COPY --chown=node:node . .

USER node

RUN npm ci

EXPOSE 3000

CMD ["npm", "start"]
