FROM node:18-alpine

WORKDIR /app

# First copy only package files
COPY package*.json ./

# Install dependencies with explicit flags
RUN npm install --legacy-peer-deps --loglevel=error

# Copy all other files
COPY . .

ENV VITE_API_URL=http://backend:8000
ENV HOST=0.0.0.0
ENV NODE_ENV=development

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]