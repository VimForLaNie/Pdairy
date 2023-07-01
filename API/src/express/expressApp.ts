import express from "express";
import bodyParser from "body-parser";
import redisClient from "../Redis/redisClient";

import { PrismaClient } from '@prisma/client'
import crypto from "crypto";

const prisma = new PrismaClient();
const expressApp = express();
const jsonParser = bodyParser.json();

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
    res.send(await prisma.milkRecord.findMany());
});

expressApp.post('/farm', jsonParser, async (req, res) => {
    const apiKey = req.headers['x-api-key'];
    if(apiKey !== process.env.API_KEY){
        console.log(apiKey);
        return res.sendStatus(403);
    }

    const { farmName, owner } = req.body;
    console.log('Got body:', req.body);
    const result = await prisma.farm.create({
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
    const result = await prisma.cow.create({
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

export default expressApp;