-- CreateTable
CREATE TABLE "Demand" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "lastName" TEXT,
    "firstName" TEXT,
    "gender" TEXT,
    "birthDate" TEXT,
    "birthPlace" TEXT,
    "birthCountry" TEXT,
    "nationality" TEXT,
    "profession" TEXT,
    "phone1" TEXT,
    "phone2" TEXT,
    "homeAddress" TEXT,
    "kindVisa" TEXT,
    "fromEmbassy" BOOLEAN,
    "price" DOUBLE PRECISION,
    "previousStayDate" TEXT,
    "entryDate" TEXT,
    "residence" TEXT,
    "duration" INTEGER,
    "depCountry" TEXT,
    "destination" TEXT,
    "subsistenceMean" TEXT,
    "returnGuarantee" TEXT,
    "tripReason" TEXT,
    "numDocument" TEXT NOT NULL,
    "passportExpireDate" TEXT NOT NULL,
    "passportIssueCountry" TEXT,
    "passportIssueDate" TEXT,
    "token" TEXT,
    "expireLink" TIMESTAMP(3),
    "statut" TEXT NOT NULL DEFAULT 'en_attente',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Demand_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Demand_email_key" ON "Demand"("email");
