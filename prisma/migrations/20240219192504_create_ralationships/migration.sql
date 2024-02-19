/*
  Warnings:

  - Added the required column `user_org_id` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "user_org_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_user_org_id_fkey" FOREIGN KEY ("user_org_id") REFERENCES "user_orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
