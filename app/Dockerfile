# Base image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install
RUN npm install -g nodemon # Install nodemon globally

# Copy the application code (we'll override this with a volume in docker-compose)
COPY . .

# Expose the app's port
EXPOSE 3000

# Default command (overridden by docker-compose for development)
CMD ["npm", "start"]