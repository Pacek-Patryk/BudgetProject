FROM node:16-alpine
WORKDIR /express_js
COPY package*.json ./
COPY ./ ./
RUN npm i
EXPOSE 3000
CMD ["npm", "start"]