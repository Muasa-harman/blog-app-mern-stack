# client/Dockerfile

# Step 1: Use an official Node.js runtime as a parent image
FROM node:20.11.1

# Step 2: Set the working directory in the container
WORKDIR /client

# Step 3: Copy the package.json and package-lock.json/yarn.lock
COPY package*.json ./

# Step 4: Install frontend dependencies
RUN npm install

# Step 5: Copy the frontend source code
COPY . .

# Step 6: Expose the Vite development server port (default is 5173)
EXPOSE 5173

# Step 7: Command to run the Vite development server
CMD ["npm", "run", "dev", "--", "--host"]








# # client/Dockerfile

# # Use an official Node.js runtime as the parent image for building the frontend
# FROM node:v20.11.1


# # Set the working directory inside the container
# WORKDIR /blog-app-mern-stack/client

# # Copy package.json and package-lock.json files
# COPY package*.json ./

# # Install client dependencies
# RUN npm install

# # Copy the client source code
# COPY . .

# # Build the client app
# RUN npm run build

# # Use a lightweight Nginx image to serve the frontend build
# FROM nginx:alpine
# COPY --from=0 /usr/src/app/build /usr/share/nginx/html

# # Expose the port Nginx will run on (e.g., 80)
# EXPOSE 80
