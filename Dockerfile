FROM node:13
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . ./
CMD node -r dotenv/config ./bin/www
EXPOSE 3000