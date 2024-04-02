/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `tbl_user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `tbl_user_email_key` ON `tbl_user`(`email`);
