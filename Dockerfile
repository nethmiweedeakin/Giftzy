#base image
FROM node:18

#set working directory
WORKDIR /app

#copy package.json and install dependencies
COPY package*.json ./
RUN npm install

#copy the rest of the app
COPY . .

#expose port and start server
EXPOSE 3000
CMD ["node", "server.js"]