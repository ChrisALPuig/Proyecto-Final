-- Clear existing data to allow script re-runs (idempotent)
-- Use foreign_key_checks to allow cascading deletes
SET FOREIGN_KEY_CHECKS = 0;
DELETE FROM game_features;
DELETE FROM game_tags;
DELETE FROM game_genres;
DELETE FROM game_images;
DELETE FROM cart_item;
DELETE FROM cart;
DELETE FROM game;
SET FOREIGN_KEY_CHECKS = 1;

-- =========================================================
-- DOOM (2016)
-- =========================================================
INSERT INTO game (id, title, edition, price, cover_image, trailer_video, hero_video, description_video, description, story, system_requirements_min, system_requirements_recommended)
VALUES (1, 'DOOM (2016)', 'Deluxe Edition', 19.99, '/assets/images/doom-2016.jpg', '/assets/videos/doom-trailer.mp4', '/assets/videos/doomfondo.mp4', '/assets/videos/doom-description.mp4', 'Developed by id Software, the studio that pioneered the first-person shooter genre and created multiplayer Deathmatch, DOOM returns as a brutally fun and challenging modern-day shooter experience. Relentless demons, impossibly destructive guns, and fast, fluid movement provide the foundation for intense, first-person combat.', 'You''ve come here for a reason. The Union Aerospace Corporation''s massive research facility on Mars is overwhelmed by fierce and powerful demons, and only one person stands between their world and ours. As the lone DOOM Marine, you''ve been activated to do one thing – kill them all.', 'OS: Windows 10; Processor: Intel Core i5-2400 / AMD FX-8320 or better; Memory: 8GB RAM; Graphics: NVIDIA GTX 670 / AMD Radeon HD 7870; DirectX: Version 11; Storage: 55 GB available space', 'OS: Windows 10 / 11; Processor: Intel Core i7-3770 / AMD FX-8350 or better; Memory: 8GB RAM; Graphics: NVIDIA GTX 970 / AMD Radeon R9 290; DirectX: Version 11; Storage: 55 GB available space');

INSERT INTO game_images (game_id, image) VALUES (1, '/assets/images/doom-2016.jpg');
INSERT INTO game_images (game_id, image) VALUES (1, '/assets/images/doom/doom1.jpg');
INSERT INTO game_images (game_id, image) VALUES (1, '/assets/images/doom/doom2.jpg');
INSERT INTO game_images (game_id, image) VALUES (1, '/assets/images/doom/doom3.jpg');
INSERT INTO game_images (game_id, image) VALUES (1, '/assets/images/doom/doom4.jpg');
INSERT INTO game_images (game_id, image) VALUES (1, '/assets/images/doom/doom5.jpg');
INSERT INTO game_images (game_id, image) VALUES (1, '/assets/images/doom/doom6.jpg');
INSERT INTO game_images (game_id, image) VALUES (1, '/assets/images/doom/doom7.jpg');

INSERT INTO game_genres (game_id, genre) VALUES (1, 'Shooter');
INSERT INTO game_genres (game_id, genre) VALUES (1, 'FPP');
INSERT INTO game_genres (game_id, genre) VALUES (1, 'Sci-fi');

INSERT INTO game_tags (game_id, tag) VALUES (1, 'Atmospheric');
INSERT INTO game_tags (game_id, tag) VALUES (1, 'Sci-fi');
INSERT INTO game_tags (game_id, tag) VALUES (1, 'Science');
INSERT INTO game_tags (game_id, tag) VALUES (1, 'First-Person');
INSERT INTO game_tags (game_id, tag) VALUES (1, 'Great Soundtrack');

INSERT INTO game_features (game_id, feature) VALUES (1, 'Achievements');
INSERT INTO game_features (game_id, feature) VALUES (1, 'Cloud saves');
INSERT INTO game_features (game_id, feature) VALUES (1, 'Controller support');
INSERT INTO game_features (game_id, feature) VALUES (1, 'Single-player');

-- =========================================================
-- Resident Evil Village
-- =========================================================
INSERT INTO game (id, title, edition, price, cover_image, trailer_video, hero_video, description_video, description, story, system_requirements_min, system_requirements_recommended)
VALUES (2, 'Resident Evil Village', 'Standard Edition', 59.99, 'https://upload.wikimedia.org/wikipedia/en/2/2c/Resident_Evil_Village.png', '/assets/videos/re8-trailer.mp4', '/assets/videos/re8-hero.mp4', '/assets/videos/re8-description.mp4', 'Resident Evil Village continues the story of Ethan Winters in a mysterious and horrifying European village. Survival horror returns with terrifying enemies, intense combat, and rich exploration.', 'Ethan Winters, now living in peace after previous ordeals, is dragged back into darkness when his daughter is kidnapped. Facing terrifying creatures and uncovering village secrets, Ethan must survive and rescue his family.', 'OS: Windows 10; Processor: Intel Core i5-4460 / AMD FX-6300 or better; Memory: 8GB RAM; Graphics: NVIDIA GTX 760 / AMD Radeon R7 260x; DirectX: Version 11; Storage: 50 GB available space', 'OS: Windows 10 / 11; Processor: Intel Core i7-6700K / AMD Ryzen 5 1600 or better; Memory: 16GB RAM; Graphics: NVIDIA GTX 1070 / AMD RX Vega 56; DirectX: Version 12; Storage: 50 GB available space');

INSERT INTO game_images (game_id, image) VALUES (2, 'https://upload.wikimedia.org/wikipedia/en/2/2c/Resident_Evil_Village.png');
INSERT INTO game_images (game_id, image) VALUES (2, 'https://static.wikia.nocookie.net/residentevil/images/0/0f/RE_Village_screenshot_1.jpg');
INSERT INTO game_images (game_id, image) VALUES (2, 'https://static.wikia.nocookie.net/residentevil/images/1/1a/RE_Village_screenshot_2.jpg');
INSERT INTO game_images (game_id, image) VALUES (2, 'https://static.wikia.nocookie.net/residentevil/images/2/2b/RE_Village_screenshot_3.jpg');
INSERT INTO game_images (game_id, image) VALUES (2, 'https://static.wikia.nocookie.net/residentevil/images/3/3c/RE_Village_screenshot_4.jpg');
INSERT INTO game_images (game_id, image) VALUES (2, 'https://static.wikia.nocookie.net/residentevil/images/4/4d/RE_Village_screenshot_5.jpg');

INSERT INTO game_genres (game_id, genre) VALUES (2, 'Survival Horror');
INSERT INTO game_genres (game_id, genre) VALUES (2, 'Action');
INSERT INTO game_genres (game_id, genre) VALUES (2, 'Adventure');

INSERT INTO game_tags (game_id, tag) VALUES (2, 'Horror');
INSERT INTO game_tags (game_id, tag) VALUES (2, 'Story Rich');
INSERT INTO game_tags (game_id, tag) VALUES (2, 'Single-Player');
INSERT INTO game_tags (game_id, tag) VALUES (2, 'Atmospheric');
INSERT INTO game_tags (game_id, tag) VALUES (2, 'Gore');

INSERT INTO game_features (game_id, feature) VALUES (2, 'Achievements');
INSERT INTO game_features (game_id, feature) VALUES (2, 'Cloud saves');
INSERT INTO game_features (game_id, feature) VALUES (2, 'Controller support');
INSERT INTO game_features (game_id, feature) VALUES (2, 'Single-player');

-- =========================================================
-- Cyberpunk 2077
-- =========================================================
INSERT INTO game (id, title, edition, price, cover_image, trailer_video, hero_video, description_video, description, story, system_requirements_min, system_requirements_recommended)
VALUES (3, 'Cyberpunk 2077', 'Standard Edition', 49.99, 'https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg', '/assets/videos/cyberpunk-trailer.mp4', '/assets/videos/cyberpunk-hero.mp4', '/assets/videos/cyberpunk-description.mp4', 'Cyberpunk 2077 is an open-world, action-adventure RPG set in the dark future of Night City — a dangerous megalopolis obsessed with power, glamor, and ceaseless body modification.', 'You play as V, a mercenary outlaw going after a one-of-a-kind implant that can''t be stolen. A body-hopping cyberpsycho with the power to save or enslave Night City.', 'OS: Windows 10; Processor: Intel Core i5-3570K / AMD FX-8310 or better; Memory: 8GB RAM; Graphics: NVIDIA GTX 780 / AMD Radeon RX 470; DirectX: Version 12; Storage: 70 GB available space', 'OS: Windows 10 / 11; Processor: Intel Core i7-4790 / AMD Ryzen 3 3200G or better; Memory: 12GB RAM; Graphics: NVIDIA GTX 1060 / AMD Radeon RX 580; DirectX: Version 12; Storage: 70 GB available space');

INSERT INTO game_images (game_id, image) VALUES (3, 'https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg');
INSERT INTO game_images (game_id, image) VALUES (3, 'https://static.wikia.nocookie.net/cyberpunk/images/0/0f/Cyberpunk_2077_screenshot_1.jpg');
INSERT INTO game_images (game_id, image) VALUES (3, 'https://static.wikia.nocookie.net/cyberpunk/images/1/1a/Cyberpunk_2077_screenshot_2.jpg');
INSERT INTO game_images (game_id, image) VALUES (3, 'https://static.wikia.nocookie.net/cyberpunk/images/2/2b/Cyberpunk_2077_screenshot_3.jpg');
INSERT INTO game_images (game_id, image) VALUES (3, 'https://static.wikia.nocookie.net/cyberpunk/images/3/3c/Cyberpunk_2077_screenshot_4.jpg');

INSERT INTO game_genres (game_id, genre) VALUES (3, 'RPG');
INSERT INTO game_genres (game_id, genre) VALUES (3, 'Action');
INSERT INTO game_genres (game_id, genre) VALUES (3, 'Adventure');

INSERT INTO game_tags (game_id, tag) VALUES (3, 'Open World');
INSERT INTO game_tags (game_id, tag) VALUES (3, 'Sci-fi');
INSERT INTO game_tags (game_id, tag) VALUES (3, 'Story Rich');
INSERT INTO game_tags (game_id, tag) VALUES (3, 'RPG');
INSERT INTO game_tags (game_id, tag) VALUES (3, 'Futuristic');

INSERT INTO game_features (game_id, feature) VALUES (3, 'Achievements');
INSERT INTO game_features (game_id, feature) VALUES (3, 'Cloud saves');
INSERT INTO game_features (game_id, feature) VALUES (3, 'Controller support');
INSERT INTO game_features (game_id, feature) VALUES (3, 'Single-player');

-- =========================================================
-- The Witcher 3: Wild Hunt
-- =========================================================
INSERT INTO game (id, title, edition, price, cover_image, trailer_video, hero_video, description_video, description, story, system_requirements_min, system_requirements_recommended)
VALUES (4, 'The Witcher 3: Wild Hunt', 'Game of the Year Edition', 39.99, 'https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg', '/assets/videos/witcher-trailer.mp4', '/assets/videos/witcher-hero.mp4', '/assets/videos/witcher-description.mp4', 'The Witcher 3: Wild Hunt is a story-driven, next-generation open world role-playing game set in a visually stunning fantasy universe full of meaningful choices and impactful consequences.', 'In The Witcher, you play as professional monster hunter Geralt of Rivia tasked with finding Ciri — a child of destiny, the heir to ancient elven blood and the source of all Geralt''s troubles.', 'OS: Windows 7 / 8 / 10; Processor: Intel Core i5-2500K / AMD Phenom II X4 940; Memory: 6GB RAM; Graphics: NVIDIA GTX 660 / AMD Radeon HD 7870; DirectX: Version 11; Storage: 35 GB available space', 'OS: Windows 7 / 8 / 10; Processor: Intel Core i7-3770 / AMD FX-8350; Memory: 8GB RAM; Graphics: NVIDIA GTX 770 / AMD Radeon R9 290; DirectX: Version 11; Storage: 35 GB available space');

INSERT INTO game_images (game_id, image) VALUES (4, 'https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg');
INSERT INTO game_images (game_id, image) VALUES (4, 'https://static.wikia.nocookie.net/witcher/images/1/1a/The_Witcher_3_screenshot_1.jpg');
INSERT INTO game_images (game_id, image) VALUES (4, 'https://static.wikia.nocookie.net/witcher/images/2/2b/The_Witcher_3_screenshot_2.jpg');
INSERT INTO game_images (game_id, image) VALUES (4, 'https://static.wikia.nocookie.net/witcher/images/3/3c/The_Witcher_3_screenshot_3.jpg');
INSERT INTO game_images (game_id, image) VALUES (4, 'https://static.wikia.nocookie.net/witcher/images/4/4d/The_Witcher_3_screenshot_4.jpg');

INSERT INTO game_genres (game_id, genre) VALUES (4, 'RPG');
INSERT INTO game_genres (game_id, genre) VALUES (4, 'Action');
INSERT INTO game_genres (game_id, genre) VALUES (4, 'Adventure');

INSERT INTO game_tags (game_id, tag) VALUES (4, 'Open World');
INSERT INTO game_tags (game_id, tag) VALUES (4, 'Fantasy');
INSERT INTO game_tags (game_id, tag) VALUES (4, 'Story Rich');
INSERT INTO game_tags (game_id, tag) VALUES (4, 'RPG');
INSERT INTO game_tags (game_id, tag) VALUES (4, 'Choices Matter');

INSERT INTO game_features (game_id, feature) VALUES (4, 'Achievements');
INSERT INTO game_features (game_id, feature) VALUES (4, 'Cloud saves');
INSERT INTO game_features (game_id, feature) VALUES (4, 'Controller support');
INSERT INTO game_features (game_id, feature) VALUES (4, 'Single-player');

-- =========================================================
-- Grand Theft Auto V
-- =========================================================
INSERT INTO game (id, title, edition, price, cover_image, trailer_video, hero_video, description_video, description, story, system_requirements_min, system_requirements_recommended)
VALUES (5, 'Grand Theft Auto V', 'Premium Edition', 29.99, 'https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png', '/assets/videos/gta-trailer.mp4', '/assets/videos/gta-hero.mp4', '/assets/videos/gta-description.mp4', 'Grand Theft Auto V is an action-adventure game played from either a third-person or first-person perspective. Players complete missions—linear scenarios with set objectives—to progress through the story.', 'Los Santos: a sprawling sun-soaked metropolis full of self-help gurus, starlets and fading celebrities, once the envy of the Western world, now struggling to stay alive in a time of economic uncertainty and cheap reality TV.', 'OS: Windows 8.1 / 10; Processor: Intel Core 2 Quad Q6600 / AMD Phenom 9850; Memory: 4GB RAM; Graphics: NVIDIA 9800 GT 1GB / AMD HD 4870 1GB; DirectX: Version 10; Storage: 72 GB available space', 'OS: Windows 8.1 / 10; Processor: Intel Core i5 3470 / AMD X8 FX-8350; Memory: 8GB RAM; Graphics: NVIDIA GTX 660 2GB / AMD HD 7870 2GB; DirectX: Version 11; Storage: 72 GB available space');

INSERT INTO game_images (game_id, image) VALUES (5, 'https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png');
INSERT INTO game_images (game_id, image) VALUES (5, 'https://static.wikia.nocookie.net/gta/images/1/1a/GTA_V_screenshot_1.jpg');
INSERT INTO game_images (game_id, image) VALUES (5, 'https://static.wikia.nocookie.net/gta/images/2/2b/GTA_V_screenshot_2.jpg');
INSERT INTO game_images (game_id, image) VALUES (5, 'https://static.wikia.nocookie.net/gta/images/3/3c/GTA_V_screenshot_3.jpg');
INSERT INTO game_images (game_id, image) VALUES (5, 'https://static.wikia.nocookie.net/gta/images/4/4d/GTA_V_screenshot_4.jpg');

INSERT INTO game_genres (game_id, genre) VALUES (5, 'Action');
INSERT INTO game_genres (game_id, genre) VALUES (5, 'Adventure');
INSERT INTO game_genres (game_id, genre) VALUES (5, 'Open World');

INSERT INTO game_tags (game_id, tag) VALUES (5, 'Open World');
INSERT INTO game_tags (game_id, tag) VALUES (5, 'Crime');
INSERT INTO game_tags (game_id, tag) VALUES (5, 'Story Rich');
INSERT INTO game_tags (game_id, tag) VALUES (5, 'Multiplayer');
INSERT INTO game_tags (game_id, tag) VALUES (5, 'Humor');

INSERT INTO game_features (game_id, feature) VALUES (5, 'Achievements');
INSERT INTO game_features (game_id, feature) VALUES (5, 'Cloud saves');
INSERT INTO game_features (game_id, feature) VALUES (5, 'Controller support');
INSERT INTO game_features (game_id, feature) VALUES (5, 'Single-player');
INSERT INTO game_features (game_id, feature) VALUES (5, 'Multi-player');
