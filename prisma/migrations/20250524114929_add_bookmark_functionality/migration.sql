/*
  Warnings:

  - You are about to drop the `_ContestToUser` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,contestId]` on the table `Bookmark` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_ContestToUser" DROP CONSTRAINT "_ContestToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ContestToUser" DROP CONSTRAINT "_ContestToUser_B_fkey";

-- DropTable
DROP TABLE "_ContestToUser";

-- CreateIndex
CREATE UNIQUE INDEX "Bookmark_userId_contestId_key" ON "Bookmark"("userId", "contestId");
