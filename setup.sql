CREATE TABLE `guild` (`config` JSON NOT NULL, `warn` JSON NOT NULL);
INSERT INTO guild (config, warn) VALUES ('{"warnlimit": 3}', '{}');