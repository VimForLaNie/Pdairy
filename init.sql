-- CreateTable
CREATE TABLE "Farm" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "owner" TEXT NOT NULL,

    CONSTRAINT "Farm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cow" (
    "id" TEXT NOT NULL,
    "genetic" TEXT NOT NULL,
    "birthdate" TIMESTAMPTZ(0) NOT NULL,
    "weightAtBirth" DOUBLE PRECISION NOT NULL,
    "fatherName" TEXT NOT NULL,
    "fatherGenetic" TEXT NOT NULL,
    "motherName" TEXT NOT NULL,
    "motherGenetic" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "farmId" TEXT,

    CONSTRAINT "Cow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BreedingRecord" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMPTZ(0) NOT NULL,
    "fatherName" TEXT NOT NULL,
    "calving" TIMESTAMPTZ(0) NOT NULL,
    "calfGender" TEXT NOT NULL,
    "calfWeight" DOUBLE PRECISION NOT NULL,
    "cowId" TEXT,

    CONSTRAINT "BreedingRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MilkRecord" (
    "id" SERIAL NOT NULL,
    "recordedAt" TIMESTAMPTZ(0) NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "cowId" TEXT NOT NULL,

    CONSTRAINT "MilkRecord_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cow" ADD CONSTRAINT "Cow_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BreedingRecord" ADD CONSTRAINT "BreedingRecord_cowId_fkey" FOREIGN KEY ("cowId") REFERENCES "Cow"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MilkRecord" ADD CONSTRAINT "MilkRecord_cowId_fkey" FOREIGN KEY ("cowId") REFERENCES "Cow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;