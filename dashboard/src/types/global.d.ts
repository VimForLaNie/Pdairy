export {}

declare global {
    interface Cow {
        id: string;
        cowName: string;
        farmId: string;
        genetic: string;
        birthdate: Date;
        weightAtBirth: number;
        fatherName: string;
        motherName: string;
        fatherGenetic: string;
        motherGenetic: string;
    }

    interface Farm {
        id: string;
        name: string;
        owner: string;
    }

    interface MilkRecord {
        id: string;
        cowId: string;
        recordedAt: Date;
        amount: number;
    }
}