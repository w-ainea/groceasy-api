FROM node:14.15.1

WORKDIR /usr/src/groceasy-api

COPY . .

RUN npm install 

CMD [ "/bin/bash" ]