import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
let myEnv = dotenv.config()
dotenvExpand.expand(myEnv);
import expressApp from './express/expressApp';
import mqttClient from './MQTT/mqttClient';
import { PrismaClient } from '@prisma/client';
// import Calculator from './calculator';

const PORT = 8080;

const db = new PrismaClient();

// const machineList: Map<string, Calculator> = new Map();
const cartToCowID: Map<string, string> = new Map();
const cowRawData: Map<string, number[]> = new Map();
const latestInput: Map<number, number> = new Map();

expressApp.listen(PORT, () => console.log(`API Server listening on port ${PORT}!`));

setInterval(() => {
    const now = new Date().getTime();
    latestInput.forEach((lastInputTime, cowID) => {
        if (now - lastInputTime < 60 * 1000) return;
        const data = cowRawData.get(cowID.toString()) ?? [];
        db.milkRecord.create({
            data: {
                cowID: parseInt(cowID.toString()),
                weight: 0,
                rawData: JSON.stringify(data),
                timestamp: new Date(),
            },
        });
        latestInput.delete(cowID);
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
            if (!cartToCowID.has(cartID)) return;
            let currentCowData = [...(cowRawData.get(cartToCowID.get(cartID) ?? '') ?? []), data];
            cowRawData.set(cartToCowID.get(cartID) ?? '', currentCowData);
            // let currentMachine: Calculator;
            // if (!machineList.has(cartID)) {
            //     currentMachine = new Calculator()
            //     machineList.set(cartID, currentMachine);
            // }
            // currentMachine = (machineList.get(cartID)) ?? new Calculator();
            // currentMachine.add(data);
            // let currentCow = currentMachine.getCowID();
            // if(currentCow == null) return;
            // latestInput.set(currentCow,new Date().getTime());
            break;
        case 'setCowID':
            const RFID = message.toString();
            const cow = await db.cow.findFirst({
                where: {
                    RFID: RFID,
                },
            });
            if(cow === null) return;
            cartToCowID.set(cartID, cow?.ID?.toString());
            break;
    }
});