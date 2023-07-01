const redis = require('redis');
const express = require('express');
const mqtt = require('mqtt');
var bodyParser = require('body-parser')
const { PrismaClient } = require('@prisma/client')
const crypto = require('crypto');
const fs = require('fs');
var dotenv = require('dotenv')
var dotenvExpand = require('dotenv-expand')
var myEnv = dotenv.config()
dotenvExpand.expand(myEnv)
// console.log(process.env.MQTT_PASSWD);
// const { setInterval } = require('timers/promises');

const PORT = 3000;

const prisma = new PrismaClient()
const expressApp = express();
var jsonParser = bodyParser.json()
const mqttURL = 'mqtts://broker:8883';
const connectOptions = {
    username: "apiClient",
    password: process.env.MQTT_PASSWD,
    key: fs.readFileSync("./keys/client.key"),
    cert: fs.readFileSync("./keys/client.crt"),
    rejectUnauthorized: false,
};
const mqttClient = mqtt.connect(mqttURL, connectOptions);

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
    const result = await prisma.MilkRecord.create({
        data: {
            // id : crypto.randomBytes(16),
            weight: milkAmount,
            cowId: ID,
            recordedAt: new Date()
        },
    });
    console.log(result);
});

const redisClient = redis.createClient({
    url: 'redis://redis:6379'
});

redisClient.on('error', err => console.log('Redis Client Error', err));

redisClient.connect();

expressApp.post('/cache', jsonParser, (req, res) => {
    const { key, value } = req.body;
    console.log('Got body:', req.body);
    redisClient.set(key, value);
    res.sendStatus(200);
});


expressApp.get('/', (req, res) => {
    let cnt = 1;
    for (let i = 1; i <= 1000; i++) {
        cnt *= i;
        cnt %= 1000000007;
    }
    res.send(`Hello World! ${cnt}`);
});

expressApp.get('/read', async (req, res) => {
    res.send(await prisma.MilkRecord.findMany());
});

expressApp.post('/farm', jsonParser, async (req, res) => {
    const apiKey = req.headers['x-api-key'];
    if(apiKey !== process.env.API_KEY){
        console.log(apiKey);
        return res.sendStatus(403);
    }

    const { farmName, owner } = req.body;
    console.log('Got body:', req.body);
    const result = await prisma.Farm.create({
        data: {
            id: crypto.randomBytes(16).toString('hex'),
            name: farmName,
            owner: owner,
        },
    });
    console.log(result);
    res.send(result);
});

expressApp.post('/cow', jsonParser, async (req, res) => {
    const apiKey = req.headers['x-api-key'];
    if(apiKey !== process.env.API_KEY) return res.sendStatus(403);

    const { cowName, farmID, id, genetic, weightAtBirth, fatherName, motherName, fatherGenetic, motherGenetic} = req.body;
    console.log('Got body:', req.body);
    const result = await prisma.Cow.create({
        data: {
            id: id,
            name: cowName,
            farmId: farmID,
            genetic: genetic,
            birthdate: new Date(),
            weightAtBirth: weightAtBirth,
            fatherName: fatherName,
            motherName: motherName,
            fatherGenetic: fatherGenetic,
            motherGenetic: motherGenetic,
        },
    });
    console.log(result);
    res.send(result);
});

expressApp.listen(PORT, () => console.log(`API Server listening on port ${PORT}!`));