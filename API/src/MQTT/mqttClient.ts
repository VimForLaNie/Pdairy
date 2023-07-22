import * as mqtt from "mqtt"
import fs from "fs";

const mqttURL = 'mqtts://broker:8883';
const connectOptions = {
    username: "apiClient",
    password: process.env.MQTT_PASSWORD,
    key: fs.readFileSync("./keys/client.key"),
    cert: fs.readFileSync("./keys/client.crt"),
    rejectUnauthorized: false,
};

const mqttClient = mqtt.connect(mqttURL, connectOptions);

export default mqttClient;