Account monitoring with graphs, filters and projections

## Docker

To run the application in a Docker container:

1. Build the image:
   ```bash
   docker build -t budget-app .
   ```
2. Run the container:
   ```bash
   docker run -p 80:80 budget-app
   ```

The app will be available at http://localhost.