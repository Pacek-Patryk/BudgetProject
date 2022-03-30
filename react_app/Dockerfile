FROM node:16-alpine
WORKDIR /react_app
COPY package*.json ./
COPY ./ ./
RUN npm i
EXPOSE 3000
CMD ["npm", "start"]