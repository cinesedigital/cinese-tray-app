/*
  Warnings:

  - A unique constraint covering the columns `[store]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_store_key" ON "User"("store");
