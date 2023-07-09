import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
let myEnv = dotenv.config()
dotenvExpand.expand(myEnv);
import expressApp from './express/expressApp';
import mqttClient from './MQTT/mqttClient';
import { PrismaClient } from '@prisma/client';

const PORT = 8080;

const db = new PrismaClient();

expressApp.listen(PORT, () => console.log(`API Server listening on port ${PORT}!`));

mqttClient.on('connect', () => {
    console.log('MQTT Client Connected');
    mqttClient.subscribe('/milk/#', (err) => {
        if (err) {
            console.log('MQTT Subscribe Error', err);
        }
    });
});

mqttClient.on('message',async (topic, message) => {
    // console.log(topic);
    console.log(message.toString());
    const ID = topic.split('/')[2];
    const milkAmount = parseFloat(message.toString());
    if(isNaN(milkAmount)) return;
    const result = await db.milkRecord.create({
        data: {
            // id : crypto.randomBytes(16),
            weight: milkAmount,
            cowId: ID,
            recordedAt: new Date()
        },
    });
    console.log(result);
});