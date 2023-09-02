import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
let myEnv = dotenv.config()
dotenvExpand.expand(myEnv);
import expressApp from './express/expressApp';
import mqttClient from './MQTT/mqttClient';
import { PrismaClient } from '@prisma/client';
import Calculator from './calculator';
import startRedisClient from './Redis/redisClient';
import crypto from 'crypto';
import { machine } from 'os';

const PORT = 8080;

const db = new PrismaClient();

const machineList: Map<string, Calculator> = new Map();
const resultFromCart: Map<string, maybeResult> = new Map();
const cartToCowID: Map<string, string> = new Map();
const cowResult: Map<string, number> = new Map();
const latestInput: Map<number, number> = new Map();

expressApp.listen(PORT, () => console.log(`API Server listening on port ${PORT}!`));

const redisClient = startRedisClient();
let key = crypto.randomBytes(128).toString('base64');
console.log(`key : ${key}`);
redisClient.set('x-api-key',key);

setInterval(() => {
    const now = new Date().getTime();
    latestInput.forEach((lastInputTime, cowID) => {
        if (now - lastInputTime < 5 * 1000) return;
        machineList.forEach((currentMachine, cartID) =>{
            if(currentMachine.getCowID() !== cowID) return;
            currentMachine.calculate();
        })
    });
}, 1 * 1000);

mqttClient.on('connect', () => {
    console.log('MQTT Client Connected');
    mqttClient.subscribe('record/#', (err) => {
        if (err) {
            console.log('MQTT Subscribe Error', err);
        }
    });
    mqttClient.subscribe('setCowID/#', (err) => {
        if (err) {
            console.log('MQTT Subscribe Error', err);
        }
    });
});

mqttClient.on('message', async (topic, message) => {
    console.log(message.toString());
    const [ prefix, cartID ] = topic.split('/');
    switch (prefix) {
        case 'record':
            const data = parseFloat(message.toString());
            if (isNaN(data)) return;
            let currentMachine: Calculator;
            if (!machineList.has(cartID)) {
                currentMachine = new Calculator()
                machineList.set(cartID, currentMachine);
            }
            currentMachine = (machineList.get(cartID)) ?? new Calculator();
            currentMachine.add(data);
            let currentCow = currentMachine.getCowID();
            if(currentCow == null) return;
            latestInput.set(currentCow,new Date().getTime());
            break;
        case 'setCowID':
            const cowID = message.toString();
            if (cowID.length > 0) {
                if (!machineList.has(cartID)) {
                    machineList.set(cartID, new Calculator());
                }
                machineList.get(cartID)?.setCowID(parseInt(cowID));
            }
            break;
    }
});