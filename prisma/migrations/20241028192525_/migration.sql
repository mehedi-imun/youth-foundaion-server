-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'MEMBER', 'BLOOD_DONOR', 'USER', 'SUPER_ADMIN');

-- CreateEnum
CREATE TYPE "BloodGroup" AS ENUM ('A_POS', 'A_NEG', 'B_POS', 'B_NEG', 'AB_POS', 'AB_NEG', 'O_POS', 'O_NEG');

-- CreateEnum
CREATE TYPE "Month" AS ENUM ('JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER');

-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "FinanceType" AS ENUM ('INCOME', 'EXPENSE');

-- CreateTable
CREATE TABLE "User" (
    "name" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "customId" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "address" TEXT,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "AccountStatus" NOT NULL DEFAULT 'ACTIVE',
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "roles" "UserRole"[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserStatusHistory" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "AccountStatus" NOT NULL,
    "reason" TEXT,
    "changedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserStatusHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoundationRole" (
    "id" SERIAL NOT NULL,
    "positionId" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,

    CONSTRAINT "FoundationRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BloodDonor" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "bloodGroup" "BloodGroup" NOT NULL,
    "nextEligibleDonation" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "BloodDonor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BloodDonation" (
    "id" SERIAL NOT NULL,
    "donorId" INTEGER NOT NULL,
    "location" TEXT,
    "hospital" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "BloodDonation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Donation" (
    "id" SERIAL NOT NULL,
    "userId" TEXT,
    "donationDetailId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Donation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DonationDetail" (
    "id" SERIAL NOT NULL,
    "donationTypeId" INTEGER NOT NULL,
    "frequencyId" INTEGER NOT NULL,
    "donationMonth" "Month",
    "amount" DOUBLE PRECISION,
    "quantity" INTEGER,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "DonationDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Finance" (
    "id" SERIAL NOT NULL,
    "type" "FinanceType" NOT NULL DEFAULT 'INCOME',
    "amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "description" TEXT,
    "categoryId" INTEGER NOT NULL,
    "donationId" INTEGER,
    "isRecurring" BOOLEAN NOT NULL DEFAULT false,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Finance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinanceCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "FinanceCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoundationExpense" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FoundationExpense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoginHistory" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "loginAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipAddress" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "LoginHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserActivity" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DonationType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "DonationType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoundationPosition" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "FoundationPosition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DonationFrequency" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "DonationFrequency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserStatusHistory" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_UserActivities" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_UserBloodDonor" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_DonationToDonationType" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_UserDonations" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_UserFinances" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_UserLoginHistory" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_customId_key" ON "User"("customId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_contactNumber_key" ON "User"("contactNumber");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_createdAt_idx" ON "User"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "UserStatusHistory_userId_key" ON "UserStatusHistory"("userId");

-- CreateIndex
CREATE INDEX "UserStatusHistory_changedAt_idx" ON "UserStatusHistory"("changedAt");

-- CreateIndex
CREATE INDEX "FoundationRole_userId_positionId_idx" ON "FoundationRole"("userId", "positionId");

-- CreateIndex
CREATE INDEX "BloodDonor_userId_idx" ON "BloodDonor"("userId");

-- CreateIndex
CREATE INDEX "BloodDonation_donorId_idx" ON "BloodDonation"("donorId");

-- CreateIndex
CREATE INDEX "Donation_userId_idx" ON "Donation"("userId");

-- CreateIndex
CREATE INDEX "Donation_donationDetailId_idx" ON "Donation"("donationDetailId");

-- CreateIndex
CREATE INDEX "DonationDetail_donationTypeId_idx" ON "DonationDetail"("donationTypeId");

-- CreateIndex
CREATE INDEX "DonationDetail_frequencyId_idx" ON "DonationDetail"("frequencyId");

-- CreateIndex
CREATE INDEX "Finance_type_idx" ON "Finance"("type");

-- CreateIndex
CREATE INDEX "Finance_amount_idx" ON "Finance"("amount");

-- CreateIndex
CREATE INDEX "Finance_categoryId_idx" ON "Finance"("categoryId");

-- CreateIndex
CREATE INDEX "Finance_donationId_idx" ON "Finance"("donationId");

-- CreateIndex
CREATE UNIQUE INDEX "FinanceCategory_name_key" ON "FinanceCategory"("name");

-- CreateIndex
CREATE INDEX "FinanceCategory_name_idx" ON "FinanceCategory"("name");

-- CreateIndex
CREATE INDEX "FoundationExpense_categoryId_idx" ON "FoundationExpense"("categoryId");

-- CreateIndex
CREATE INDEX "LoginHistory_userId_loginAt_idx" ON "LoginHistory"("userId", "loginAt");

-- CreateIndex
CREATE INDEX "UserActivity_userId_createdAt_idx" ON "UserActivity"("userId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "DonationType_name_key" ON "DonationType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "FoundationPosition_name_key" ON "FoundationPosition"("name");

-- CreateIndex
CREATE UNIQUE INDEX "DonationFrequency_name_key" ON "DonationFrequency"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_UserStatusHistory_AB_unique" ON "_UserStatusHistory"("A", "B");

-- CreateIndex
CREATE INDEX "_UserStatusHistory_B_index" ON "_UserStatusHistory"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserActivities_AB_unique" ON "_UserActivities"("A", "B");

-- CreateIndex
CREATE INDEX "_UserActivities_B_index" ON "_UserActivities"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserBloodDonor_AB_unique" ON "_UserBloodDonor"("A", "B");

-- CreateIndex
CREATE INDEX "_UserBloodDonor_B_index" ON "_UserBloodDonor"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DonationToDonationType_AB_unique" ON "_DonationToDonationType"("A", "B");

-- CreateIndex
CREATE INDEX "_DonationToDonationType_B_index" ON "_DonationToDonationType"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserDonations_AB_unique" ON "_UserDonations"("A", "B");

-- CreateIndex
CREATE INDEX "_UserDonations_B_index" ON "_UserDonations"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserFinances_AB_unique" ON "_UserFinances"("A", "B");

-- CreateIndex
CREATE INDEX "_UserFinances_B_index" ON "_UserFinances"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserLoginHistory_AB_unique" ON "_UserLoginHistory"("A", "B");

-- CreateIndex
CREATE INDEX "_UserLoginHistory_B_index" ON "_UserLoginHistory"("B");

-- AddForeignKey
ALTER TABLE "UserStatusHistory" ADD CONSTRAINT "UserStatusHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoundationRole" ADD CONSTRAINT "FoundationRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoundationRole" ADD CONSTRAINT "FoundationRole_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "FoundationPosition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BloodDonor" ADD CONSTRAINT "BloodDonor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BloodDonation" ADD CONSTRAINT "BloodDonation_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "BloodDonor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_donationDetailId_fkey" FOREIGN KEY ("donationDetailId") REFERENCES "DonationDetail"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DonationDetail" ADD CONSTRAINT "DonationDetail_donationTypeId_fkey" FOREIGN KEY ("donationTypeId") REFERENCES "DonationType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DonationDetail" ADD CONSTRAINT "DonationDetail_frequencyId_fkey" FOREIGN KEY ("frequencyId") REFERENCES "DonationFrequency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Finance" ADD CONSTRAINT "Finance_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "FinanceCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Finance" ADD CONSTRAINT "Finance_donationId_fkey" FOREIGN KEY ("donationId") REFERENCES "Donation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoundationExpense" ADD CONSTRAINT "FoundationExpense_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "FinanceCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoginHistory" ADD CONSTRAINT "LoginHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserActivity" ADD CONSTRAINT "UserActivity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserStatusHistory" ADD CONSTRAINT "_UserStatusHistory_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserStatusHistory" ADD CONSTRAINT "_UserStatusHistory_B_fkey" FOREIGN KEY ("B") REFERENCES "UserStatusHistory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserActivities" ADD CONSTRAINT "_UserActivities_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserActivities" ADD CONSTRAINT "_UserActivities_B_fkey" FOREIGN KEY ("B") REFERENCES "UserActivity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserBloodDonor" ADD CONSTRAINT "_UserBloodDonor_A_fkey" FOREIGN KEY ("A") REFERENCES "BloodDonor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserBloodDonor" ADD CONSTRAINT "_UserBloodDonor_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DonationToDonationType" ADD CONSTRAINT "_DonationToDonationType_A_fkey" FOREIGN KEY ("A") REFERENCES "Donation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DonationToDonationType" ADD CONSTRAINT "_DonationToDonationType_B_fkey" FOREIGN KEY ("B") REFERENCES "DonationType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserDonations" ADD CONSTRAINT "_UserDonations_A_fkey" FOREIGN KEY ("A") REFERENCES "Donation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserDonations" ADD CONSTRAINT "_UserDonations_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFinances" ADD CONSTRAINT "_UserFinances_A_fkey" FOREIGN KEY ("A") REFERENCES "Finance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFinances" ADD CONSTRAINT "_UserFinances_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserLoginHistory" ADD CONSTRAINT "_UserLoginHistory_A_fkey" FOREIGN KEY ("A") REFERENCES "LoginHistory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserLoginHistory" ADD CONSTRAINT "_UserLoginHistory_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
