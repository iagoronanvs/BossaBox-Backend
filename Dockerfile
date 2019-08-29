FROM node:11
WORKDIR /usr/app
COPY . .
RUN yarn
EXPOSE 3000
CMD ["yarn","dev"]