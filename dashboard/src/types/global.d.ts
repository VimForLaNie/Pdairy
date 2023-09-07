export {}

declare global {
    interface Cow {
        ID?: int;
        RFID: string;
        name: string;
        feedingRecord: string;
        farmID: int;
        genetic?: string;
        birthDate: Date;
        weightAtBirth: number;
        fatherName?: string;
        motherName?: string;
        fatherGenetic?: string;
        motherGenetic?: string;
    }

    interface BreedingRecord {
        ID ?: int,
        fatherName : string,
        timestamp : Date,
        calfGender : string,
        calfWeight : number,
        motherID : int,
    }

    interface Farm {
        ID?: int;
        name: string;
        owner: string;
    }

    interface MilkRecord {
        ID?: int;
        cowID: int;
        timestamp: Date;
        weight: number;
        rawData: string;
    }
}