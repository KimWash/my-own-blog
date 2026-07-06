-- CreateTable
CREATE TABLE `PostContent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `post_id` INTEGER NOT NULL,
    `content` JSON NOT NULL,
    `create_dt` DATETIME(0) NULL,
    `update_dt` DATETIME(0) NULL,

    UNIQUE INDEX `PostContent_post_id_key`(`post_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PostContent` ADD CONSTRAINT `PostContent_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
