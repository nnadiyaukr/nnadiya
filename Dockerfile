FROM node:20.10.0-alpine
WORKDIR /app
ADD package.json package.json
RUN npm install
ADD . .
ENV NODE_ENV production
RUN npm run build
CMD ["npm", "run", "start:ssr"]
EXPOSE 3000
