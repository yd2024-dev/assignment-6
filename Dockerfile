FROM openjdk:11-jre-slim AS build

WORKDIR /app

# Step 1: Install Node.js on the OpenJDK base image
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean

# Step 2: Install Node.js dependencies
COPY package*.json ./
RUN npm install

# Step 3: Install tsx globally
RUN npm install -g tsx

# Step 4: Copy the rest of your application code
COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]
