/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email";

-- CreateTable
CREATE TABLE "UserLogin" (
    "id" SERIAL NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserLogin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserLogin_email_key" ON "UserLogin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserLogin_userId_key" ON "UserLogin"("userId");

-- AddForeignKey
ALTER TABLE "UserLogin" ADD CONSTRAINT "UserLogin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
