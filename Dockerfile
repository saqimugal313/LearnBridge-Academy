# Use a lightweight, secure Node.js Alpine image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy dependency manifests first
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the frontend source code
COPY . .

# Expose the standard Vite port
EXPOSE 5173

# Start the Vite dev server and expose it to the host machine
CMD ["npm", "run", "dev", "--", "--host"]