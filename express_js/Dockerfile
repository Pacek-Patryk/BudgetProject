FROM mhart/alpine-node:16.4.2
WORKDIR /express_js

COPY package*.json /express_js/

RUN npm install

COPY . /express_js/

EXPOSE 80

CMD ["npm", "start"]