FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including devDependencies)
RUN npm install -g vite && npm ci --only=production=false

# Copy source code
COPY . .

# Set environment variables
ENV VITE_API_URL=http://localhost:8000
ENV HOST=0.0.0.0
ENV PORT=5173

EXPOSE 5173

# Start the development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]