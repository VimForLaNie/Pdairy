
# Pdairy

Pdairy is a fully automatic system for tracking milk yield for small and medium farms.

# Installation

1. Clone this repository and add the following files

- `keys` directory which consists of OpenSSL certificate for both the server and the client
-- `broker.crt` 
-- `broker.key`
-- `ca.crt`
-- `client.crt`
-- `client.key`
- `password.txt` for MQTT user's password with `apiClient` user and all the user for the IOT devices
- `.env` which defines the following :
-- `POSTGRES_USER`
-- `POSTGRES_PASSWORD`
-- `MQTT_PASSWD`
-- `API_KEY` (for internal use only)

2. Run `docker compose up` to start the service
#### NOTE :
In case of API server overload, you can scale the server by passing the `scale` argument to the `docker compose` command.
##### Example :
`docker compose up scale api=3`
This command will create 3 API instances and use Nginx for load balancing
# API
not sure yet :P