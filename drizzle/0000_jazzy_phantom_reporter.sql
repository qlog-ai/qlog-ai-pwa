CREATE TABLE `questions` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`wallet_address` varchar(42),
	`question` text,
	`answer` text,
	`input` text,
	`created_at` datetime,
	`updated_at` datetime,
	CONSTRAINT `questions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `wallet_address_idx` ON `questions` (`wallet_address`);