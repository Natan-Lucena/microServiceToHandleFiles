/*
  Warnings:

  - You are about to drop the column `folderAdress` on the `images` table. All the data in the column will be lost.
  - Added the required column `documentUrl` to the `images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `extension` to the `images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `images` DROP COLUMN `folderAdress`,
    ADD COLUMN `documentUrl` VARCHAR(191) NOT NULL,
    ADD COLUMN `extension` VARCHAR(191) NOT NULL;
