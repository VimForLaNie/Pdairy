import type { RequestHandler } from './$types';
import { PrismaClient } from '@prisma/client';
import { json } from '@sveltejs/kit';

const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ request, cookies }) => {
    const tempCow = await request.json();
    const result = await prisma.cow.create({
        data: {
            id : "rgsregsrg",
            name: tempCow.name,
            farmId: tempCow.farmId,
            genetic: tempCow.genetic,
            birthdate: new Date(tempCow.birthdate),
            weightAtBirth: parseFloat(tempCow.weightAtBirth),
            fatherName: tempCow.fatherName,
            fatherGenetic: tempCow.fatherGenetic,
            motherName: tempCow.motherName,
            motherGenetic: tempCow.motherGenetic,
            // id: crypto.randomBytes(16).toString('hex'),
            // name: cowName,
            // farmId: farmID,
            // genetic: genetic,
            // birthdate: new Date(),
            // weightAtBirth: parseFloat(weightAtBirth),
            // fatherName: fatherName,
            // motherName: motherName,
            // fatherGenetic: fatherGenetic,
            // motherGenetic: motherGenetic,
        },
    });
    return json(result);
};