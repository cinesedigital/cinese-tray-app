/*
  Warnings:

  - Added the required column `image` to the `App` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `App` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "App" ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;
