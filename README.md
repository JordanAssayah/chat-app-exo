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
docker pull cassandra:latest
```

Copy the `db/data.cql` file to the `cassandra-data` folder for correct binding in the container

Create a container
```bash
docker run --name my-cassandra -p 9042:9042 -v /path-to-the-project/backend/db/cassandra-data:/var/lib/cassandra -d cassandra
```

To connect to the container
```bash
docker exec -it my-cassandra cqlsh
```

To create the keyspace and init the tables
```bash
SOURCE '/var/lib/cassandra/data.cql';
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

