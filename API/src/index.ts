import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
let myEnv = dotenv.config()
dotenvExpand.expand(myEnv);
import expressApp from './express/expressApp';
import mqttClient from './MQTT/mqttClient';
import { PrismaClient } from '@prisma/client';
import stateMachine from './calculator';

const PORT = 8080;

const db = new PrismaClient();

const machineList = new Map();
const resultFromCart: Map<string, maybeResult> = new Map();
const cartToCowID: Map<string, string> = new Map();
const cowResult: Map<string, number> = new Map();
const latestInput: Map<string, number> = new Map();

expressApp.listen(PORT, () => console.log(`API Server listening on port ${PORT}!`));

setInterval(() => {
    const now = new Date().getTime();
    latestInput.forEach((value, key) => {
        if (now - value > 2 * 60 * 1000) {
            cartToCowID.delete(key);
            latestInput.delete(key);
        }
    });
}, 2 * 60 * 1000);

mqttClient.on('connect', () => {
    console.log('MQTT Client Connected');
    mqttClient.subscribe('record/#', (err) => {
        if (err) {
            console.log('MQTT Subscribe Error', err);
        }
    });
    mqttClient.subscribe('setCowId/#', (err) => {
        if (err) {
            console.log('MQTT Subscribe Error', err);
        }
    });
});

mqttClient.on('message', async (topic, message) => {
    console.log(message.toString());
    const [ prefix, cartID ] = topic.split('/');
    switch (prefix) {
        case 'record':1
            const data = parseFloat(message.toString());
            if (isNaN(data)) return;
            if (!machineList.has(cartID)) {
                machineList.set(cartID, new stateMachine());
            }
            resultFromCart.set(cartID, machineList.get(cartID).addNumber(data));
            const result = resultFromCart.get(cartID);
            if (typeof result === 'number' && result > 0) {
                const cowID = cartToCowID.get(cartID);
                if (cowID) {
                    cowResult.set(cowID, result);
                    latestInput.set(cowID, new Date().getTime());
                }
            }
            break;
        case 'setCowId':
            const cowID = message.toString();
            if (cowID.length > 0) {
                if (!machineList.has(cartID)) {
                    machineList.set(cartID, new stateMachine());
                }
                cartToCowID.set(cartID, cowID);
            }
            break;
    }
});