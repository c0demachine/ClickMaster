# Use a lightweight Python image
FROM python:3.9-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the local project files into the container
COPY . .

# Expose the port that the application uses
EXPOSE 3000

# Start the simple HTTP server, matching the command in package.json
CMD ["python3", "-m", "http.server", "3000"]
