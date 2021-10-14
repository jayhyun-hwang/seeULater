# version 1

ALTER TABLE `urls`
	CHANGE COLUMN `user_id` `user_id` INT(11) NOT NULL AFTER `url_id`;