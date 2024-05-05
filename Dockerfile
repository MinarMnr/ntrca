FROM node:14.21.3-alpine AS build-step
WORKDIR /home/ntrca_frontend
COPY package.json /home/ntrca_frontend
RUN npm install
COPY . /home/ntrca_frontend
CMD ["npm", "start"]
