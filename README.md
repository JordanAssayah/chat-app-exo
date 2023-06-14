# chat-app-exo
In order to start the project please apply the following commands:

## Setup
### Enter the frontend folder and install dependencies
```bash
cd frontend && yarn
```

### Enter the backend folder and install dependencies
```bash
cd backend && yarn
```

### Create a docker container for cassandra

```bash
cd backend && docker compose up -d
```

```bash
cd backend && docker compose up -d

# Connect to the container cqlsh
docker exec -it cassandra cqlsh

# Run the init script
SOURCE '/scripts/init.cql';

exit
```

## Run the project
For the frontend
```bash
cd frontend && yarn dev
```

For the backend
```bash
cd backend && yarn dev
```

