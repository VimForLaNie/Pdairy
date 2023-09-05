-- CreateTable
CREATE TABLE "BreedingRecord" (
    "ID" SERIAL NOT NULL,
    "fatherName" TEXT NOT NULL,
    "timestamp" TIMESTAMPTZ(0) NOT NULL,
    "calfGender" TEXT NOT NULL,
    "calfWeight" DOUBLE PRECISION NOT NULL,
    "motherID" INTEGER,

    CONSTRAINT "BreedingRecord_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Cow" (
    "ID" SERIAL NOT NULL,
    "RFID" TEXT NOT NULL,
    "feedingRecord" JSONB,
    "name" TEXT NOT NULL,
    "genetic" TEXT,
    "birthDate" TIMESTAMPTZ(0) NOT NULL,
    "weightAtBirth" DOUBLE PRECISION NOT NULL,
    "fatherName" TEXT,
    "fatherGenetic" TEXT,
    "motherName" TEXT,
    "motherGenetic" TEXT,
    "farmID" INTEGER NOT NULL,
    "prediction" JSONB,
    "breedingPrediction" JSONB,

    CONSTRAINT "Cow_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Farm" (
    "ID" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "owner" TEXT NOT NULL,

    CONSTRAINT "Farm_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "MilkRecord" (
    "ID" SERIAL NOT NULL,
    "timestamp" TIMESTAMPTZ(0) NOT NULL,
    "rawData" JSONB NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "cowID" INTEGER NOT NULL,

    CONSTRAINT "MilkRecord_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cow_RFID_key" ON "Cow"("RFID");

-- AddForeignKey
ALTER TABLE "BreedingRecord" ADD CONSTRAINT "BreedingRecord_motherID_fkey" FOREIGN KEY ("motherID") REFERENCES "Cow"("ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cow" ADD CONSTRAINT "Cow_farmID_fkey" FOREIGN KEY ("farmID") REFERENCES "Farm"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MilkRecord" ADD CONSTRAINT "MilkRecord_cowID_fkey" FOREIGN KEY ("cowID") REFERENCES "Cow"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
