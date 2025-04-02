# Use Node.js base image
FROM node:18-alpine

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .

# Build the project
RUN npm run build

# Expose the port Vite will run on
EXPOSE 8080

# Start the app in preview mode
CMD ["npm", "run", "start"]
