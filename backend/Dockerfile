# backend/Dockerfile

# Use Node.js runtime as a parent image
FROM node:20.11.1

# Set the working directory inside the container
WORKDIR /blog-app-mern-stack/backend

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the backend source code
COPY . .

# Expose the port the backend will run on (e.g., 5000 for Node.js)
EXPOSE 5000

# Command to run the app
CMD ["npm", "start"]
