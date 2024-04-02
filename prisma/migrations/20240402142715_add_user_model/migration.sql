-- CreateTable
CREATE TABLE `tbl_user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `password` VARCHAR(400) NOT NULL,
    `email` VARCHAR(256) NOT NULL,
    `photo` VARCHAR(300) NOT NULL,
    `status` VARCHAR(20) NOT NULL DEFAULT 'ATIVO',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
