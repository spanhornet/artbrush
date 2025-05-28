###### Build the Docker Image

Build the API Docker image from the root of the monorepo:

```bash
docker build -f apps/api/Dockerfile -t api-app .
```

* `-f apps/api/Dockerfile` specifies the Dockerfile location.
* `-t api-app` names the image `api-app`.
* `.` sets the build context to the monorepo root (required for Turborepo and pnpm to function correctly).

###### Run the Docker Image

Start the container and expose it on port `8080`:

```bash
docker run -p 8080:8080 api-app
```

You can now access the API at [http://localhost:8080](http://localhost:8080).

###### Debug the Docker Image

If you need to troubleshoot or inspect the build process, use:

```bash
docker build --no-cache --progress=plain -f apps/api/Dockerfile -t api-app .
```

* `--no-cache` forces a fresh build (no layer reuse).
* `--progress=plain` enables full logging output for debugging.