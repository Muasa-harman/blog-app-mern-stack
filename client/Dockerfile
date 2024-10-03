# react/Dockerfile

# Step 1: Node.js runtime as a parent image
FROM node:20.11.1

# Step 2: Set the working directory in the container
WORKDIR /client

# Step 3: Copy the package.json and package-lock.json
COPY package*.json ./

# Step 4: Install client dependencies
RUN npm install

# Step 5: Copy the client source code
COPY . .

# Step 6: Expose the default Vite development server port 5173
EXPOSE 5173

# Step 7: Command to run the Vite development server
CMD ["npm", "run", "dev", "--", "--host"]



