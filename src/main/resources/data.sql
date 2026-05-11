-- Insert Triple A Games
-- Elden Ring
INSERT INTO game (id, title, edition, price, cover_image, trailer_video, hero_video, description_video, description, story, system_requirements_min, system_requirements_recommended) VALUES 
(262060, 'Elden Ring', 'Standard Edition', 59.99, 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2waq.jpg', 'https://www.youtube.com/watch?v=e8f2F2rnbYU', 'https://www.youtube.com/watch?v=e8f2F2rnbYU', 'https://www.youtube.com/watch?v=e8f2F2rnbYU', 'Elden Ring is a collaboration between FromSoftware and George R. R. Martin. Rise, Tarnished, and let grace guide you in your new adventure in the Lands Between.', 'Grace has been severed, and scattered across the Lands. You are the Elden Lord.', 'OS: Windows 10 64-bit, RAM: 12GB, GPU: GTX 1070 / RX 5600XT, Storage: 60GB', 'OS: Windows 10 64-bit, RAM: 16GB, GPU: RTX 2080 / RX 5700XT, Storage: 60GB SSD');

INSERT INTO game_genres (game_id, genre) VALUES 
(262060, 'RPG'),
(262060, 'Action'),
(262060, 'Adventure');

INSERT INTO game_tags (game_id, tag) VALUES 
(262060, 'Open World'),
(262060, 'Dark Fantasy'),
(262060, 'Souls-like');

INSERT INTO game_features (game_id, feature) VALUES 
(262060, 'Single Player'),
(262060, 'Multiplayer'),
(262060, 'Achievements');

INSERT INTO game_images (game_id, image) VALUES 
(262060, 'https://images.igdb.com/igdb/image/upload/t_screenshot_big/scngy4.jpg'),
(262060, 'https://images.igdb.com/igdb/image/upload/t_screenshot_big/scmqxa.jpg');

-- Baldur's Gate 3
INSERT INTO game (id, title, edition, price, cover_image, trailer_video, hero_video, description_video, description, story, system_requirements_min, system_requirements_recommended) VALUES 
(115288, 'Baldur''s Gate 3', 'Standard Edition', 59.99, 'https://images.igdb.com/igdb/image/upload/t_cover_big/co5hoy.jpg', 'https://www.youtube.com/watch?v=GfqJbk8Tg0s', 'https://www.youtube.com/watch?v=GfqJbk8Tg0s', 'https://www.youtube.com/watch?v=GfqJbk8Tg0s', 'Baldur''s Gate 3 is a story-rich, party-based RPG set in the world of D&D 5e. Gather your party and venture forth!', 'A tadpole has been planted in your brain. You must act quickly to find a cure, but in doing so, you might uncover something far more sinister.', 'OS: Windows 10 64-bit, RAM: 8GB, GPU: GTX 960 / RX 560, Storage: 150GB', 'OS: Windows 10 64-bit, RAM: 16GB, GPU: RTX 2070 / RX 5700XT, Storage: 150GB SSD');

INSERT INTO game_genres (game_id, genre) VALUES 
(115288, 'RPG'),
(115288, 'Adventure');

INSERT INTO game_tags (game_id, tag) VALUES 
(115288, 'Tactical'),
(115288, 'Story Rich'),
(115288, 'Fantasy');

INSERT INTO game_features (game_id, feature) VALUES 
(115288, 'Single Player'),
(115288, 'Multiplayer'),
(115288, 'Achievements'),
(115288, 'Cloud Saves');

INSERT INTO game_images (game_id, image) VALUES 
(115288, 'https://images.igdb.com/igdb/image/upload/t_screenshot_big/scd0oh.jpg'),
(115288, 'https://images.igdb.com/igdb/image/upload/t_screenshot_big/scd0oi.jpg');

-- Cyberpunk 2077
INSERT INTO game (id, title, edition, price, cover_image, trailer_video, hero_video, description_video, description, story, system_requirements_min, system_requirements_recommended) VALUES 
(155437, 'Cyberpunk 2077', 'Standard Edition', 39.99, 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1xct.jpg', 'https://www.youtube.com/watch?v=UKHv8pNzSu4', 'https://www.youtube.com/watch?v=UKHv8pNzSu4', 'https://www.youtube.com/watch?v=UKHv8pNzSu4', 'Cyberpunk 2077 is an open-world action RPG set in the dark future of Night City. Play as V, an outlaw trying to survive in the futuristic metropolis.', 'Become a legendary mercenary in Night City. Create your character and embark on a life-changing adventure in the vibrant, dystopian metropolis of the distant future.', 'OS: Windows 7/10 64-bit, RAM: 8GB, GPU: GTX 780 / RX 470, Storage: 70GB', 'OS: Windows 10 64-bit, RAM: 16GB, GPU: RTX 2070 / RX 5700XT, Storage: 70GB SSD');

INSERT INTO game_genres (game_id, genre) VALUES 
(155437, 'RPG'),
(155437, 'Action'),
(155437, 'Adventure');

INSERT INTO game_tags (game_id, tag) VALUES 
(155437, 'Open World'),
(155437, 'Sci-Fi'),
(155437, 'Cyberpunk');

INSERT INTO game_features (game_id, feature) VALUES 
(155437, 'Single Player'),
(155437, 'Achievements'),
(155437, 'Cloud Saves');

INSERT INTO game_images (game_id, image) VALUES 
(155437, 'https://images.igdb.com/igdb/image/upload/t_screenshot_big/scd0oj.jpg'),
(155437, 'https://images.igdb.com/igdb/image/upload/t_screenshot_big/scd0ok.jpg');

-- The Legend of Zelda: Tears of the Kingdom
INSERT INTO game (id, title, edition, price, cover_image, trailer_video, hero_video, description_video, description, story, system_requirements_min, system_requirements_recommended) VALUES 
(383025, 'The Legend of Zelda: Tears of the Kingdom', 'Standard Edition', 69.99, 'https://images.igdb.com/igdb/image/upload/t_cover_big/co5p6h.jpg', 'https://www.youtube.com/watch?v=gUDIe-fRJMo', 'https://www.youtube.com/watch?v=gUDIe-fRJMo', 'https://www.youtube.com/watch?v=gUDIe-fRJMo', 'An epic adventure awaits in The Legend of Zelda: Tears of the Kingdom. Explore a vast world, solve puzzles, and battle enemies on your quest to save Zelda.', 'Zelda is missing. A deep darkness has covered Hyrule. Link must uncover the truth to save her and the kingdom.', 'OS: Nintendo Switch', 'OS: Nintendo Switch (Recommended: Latest firmware)');

INSERT INTO game_genres (game_id, genre) VALUES 
(383025, 'Adventure'),
(383025, 'Action'),
(383025, 'Puzzle');

INSERT INTO game_tags (game_id, tag) VALUES 
(383025, 'Open World'),
(383025, 'Fantasy'),
(383025, 'Exploration');

INSERT INTO game_features (game_id, feature) VALUES 
(383025, 'Single Player'),
(383025, 'Achievements');

INSERT INTO game_images (game_id, image) VALUES 
(383025, 'https://images.igdb.com/igdb/image/upload/t_screenshot_big/scdcd8.jpg'),
(383025, 'https://images.igdb.com/igdb/image/upload/t_screenshot_big/scdcd9.jpg');

-- Starfield
INSERT INTO game (id, title, edition, price, cover_image, trailer_video, hero_video, description_video, description, story, system_requirements_min, system_requirements_recommended) VALUES 
(220519, 'Starfield', 'Standard Edition', 69.99, 'https://images.igdb.com/igdb/image/upload/t_cover_big/co5qkz.jpg', 'https://www.youtube.com/watch?v=zmZiepYXmks', 'https://www.youtube.com/watch?v=zmZiepYXmks', 'https://www.youtube.com/watch?v=zmZiepYXmks', 'Starfield is the next generation of space exploration. Explore a vast galaxy, complete missions, and uncover the mysteries of the cosmos.', 'You awaken in a mining facility with no memory of how you got there. Your journey across the stars begins.', 'OS: Windows 10/11 64-bit, RAM: 16GB, GPU: RTX 2060 / RX 5700, Storage: 125GB', 'OS: Windows 10/11 64-bit, RAM: 32GB, GPU: RTX 2080 / RTX 3080, Storage: 125GB SSD');

INSERT INTO game_genres (game_id, genre) VALUES 
(220519, 'RPG'),
(220519, 'Action'),
(220519, 'Adventure');

INSERT INTO game_tags (game_id, tag) VALUES 
(220519, 'Space Exploration'),
(220519, 'Sci-Fi'),
(220519, 'Open World');

INSERT INTO game_features (game_id, feature) VALUES 
(220519, 'Single Player'),
(220519, 'Achievements'),
(220519, 'Cloud Saves');

INSERT INTO game_images (game_id, image) VALUES 
(220519, 'https://images.igdb.com/igdb/image/upload/t_screenshot_big/sceyqm.jpg'),
(220519, 'https://images.igdb.com/igdb/image/upload/t_screenshot_big/sceyqn.jpg');

-- Final Fantasy XVI
INSERT INTO game (id, title, edition, price, cover_image, trailer_video, hero_video, description_video, description, story, system_requirements_min, system_requirements_recommended) VALUES 
(303212, 'Final Fantasy XVI', 'Standard Edition', 69.99, 'https://images.igdb.com/igdb/image/upload/t_cover_big/co5j9x.jpg', 'https://www.youtube.com/watch?v=mGdqEXLXjcI', 'https://www.youtube.com/watch?v=mGdqEXLXjcI', 'https://www.youtube.com/watch?v=mGdqEXLXjcI', 'Final Fantasy XVI is an action-packed adventure in the world of Valisthea. Play as Clive, a warrior on a quest for vengeance and truth.', 'Clive must uncover the mysteries of the dominants and the threat of eikons as he fights to save Valisthea from destruction.', 'OS: Windows 10 64-bit, RAM: 16GB, GPU: RTX 2070 / RX 5700XT, Storage: 150GB', 'OS: Windows 10 64-bit, RAM: 32GB, GPU: RTX 3080 / RX 6800XT, Storage: 150GB SSD');

INSERT INTO game_genres (game_id, genre) VALUES 
(303212, 'RPG'),
(303212, 'Action'),
(303212, 'Adventure');

INSERT INTO game_tags (game_id, tag) VALUES 
(303212, 'Fantasy'),
(303212, 'Story Rich'),
(303212, 'Japanese RPG');

INSERT INTO game_features (game_id, feature) VALUES 
(303212, 'Single Player'),
(303212, 'Achievements'),
(303212, 'Cloud Saves');

INSERT INTO game_images (game_id, image) VALUES 
(303212, 'https://images.igdb.com/igdb/image/upload/t_screenshot_big/scpuux.jpg'),
(303212, 'https://images.igdb.com/igdb/image/upload/t_screenshot_big/scpuuy.jpg');

-- Hogwarts Legacy
INSERT INTO game (id, title, edition, price, cover_image, trailer_video, hero_video, description_video, description, story, system_requirements_min, system_requirements_recommended) VALUES 
(228409, 'Hogwarts Legacy', 'Standard Edition', 49.99, 'https://images.igdb.com/igdb/image/upload/t_cover_big/co5gul.jpg', 'https://www.youtube.com/watch?v=1O6Qstncpnc', 'https://www.youtube.com/watch?v=1O6Qstncpnc', 'https://www.youtube.com/watch?v=1O6Qstncpnc', 'Experience life as a student in Hogwarts School of Witchcraft and Wizardry. Explore the castle, master magic, and uncover secrets in the wizarding world.', 'You are a late student who has arrived at Hogwarts with a special gift. Discover the truth about ancient magic and your role in the wizarding world.', 'OS: Windows 10 64-bit, RAM: 8GB, GPU: GTX 960 / RX 570, Storage: 100GB', 'OS: Windows 10 64-bit, RAM: 16GB, GPU: RTX 2070 / RX 5700XT, Storage: 100GB SSD');

INSERT INTO game_genres (game_id, genre) VALUES 
(228409, 'RPG'),
(228409, 'Adventure'),
(228409, 'Action');

INSERT INTO game_tags (game_id, tag) VALUES 
(228409, 'Magic'),
(228409, 'School'),
(228409, 'Fantasy');

INSERT INTO game_features (game_id, feature) VALUES 
(228409, 'Single Player'),
(228409, 'Achievements'),
(228409, 'Cloud Saves');

INSERT INTO game_images (game_id, image) VALUES 
(228409, 'https://images.igdb.com/igdb/image/upload/t_screenshot_big/scit5f.jpg'),
(228409, 'https://images.igdb.com/igdb/image/upload/t_screenshot_big/scit5g.jpg');

-- The Legend of Zelda: Breath of the Wild
INSERT INTO game (id, title, edition, price, cover_image, trailer_video, hero_video, description_video, description, story, system_requirements_min, system_requirements_recommended) VALUES 
(26286, 'The Legend of Zelda: Breath of the Wild', 'Standard Edition', 59.99, 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1rq7.jpg', 'https://www.youtube.com/watch?v=1rPxiXXxftE', 'https://www.youtube.com/watch?v=1rPxiXXxftE', 'https://www.youtube.com/watch?v=1rPxiXXxftE', 'Explore the kingdom of Hyrule in The Legend of Zelda: Breath of the Wild. A sprawling, open-air adventure awaits in a world full of mystery and danger.', 'Link must awaken from a century of slumber to defeat Calamity Ganon and save Princess Zelda and the kingdom of Hyrule.', 'OS: Nintendo Switch', 'OS: Nintendo Switch (Recommended: Latest firmware)');

INSERT INTO game_genres (game_id, genre) VALUES 
(26286, 'Adventure'),
(26286, 'Action'),
(26286, 'Puzzle');

INSERT INTO game_tags (game_id, tag) VALUES 
(26286, 'Open World'),
(26286, 'Fantasy'),
(26286, 'Exploration');

INSERT INTO game_features (game_id, feature) VALUES 
(26286, 'Single Player'),
(26286, 'Achievements');

INSERT INTO game_images (game_id, image) VALUES 
(26286, 'https://images.igdb.com/igdb/image/upload/t_screenshot_big/scdt1t.jpg'),
(26286, 'https://images.igdb.com/igdb/image/upload/t_screenshot_big/scdt1u.jpg');

-- Red Dead Redemption 2
INSERT INTO game (id, title, edition, price, cover_image, trailer_video, hero_video, description_video, description, story, system_requirements_min, system_requirements_recommended) VALUES 
(104308, 'Red Dead Redemption 2', 'Standard Edition', 59.99, 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1sre.jpg', 'https://www.youtube.com/watch?v=eaQc5-DVGiU', 'https://www.youtube.com/watch?v=eaQc5-DVGiU', 'https://www.youtube.com/watch?v=eaQc5-DVGiU', 'Red Dead Redemption 2 is an action-adventure game set in a sprawling, atmospheric world. Experience the epic tale of outlaw Arthur Morgan.', 'Arthur Morgan and the Van der Linde gang are forced to rob, steal and fight to survive in harsh northern American wilderness. As civilisation encroaches on their way of life, the gang must plan a massive heist to secure their future.', 'OS: Windows 10 64-bit, RAM: 8GB, GPU: GTX 960 / GTX 1050 Ti, Storage: 150GB', 'OS: Windows 10 64-bit, RAM: 16GB, GPU: RTX 2060 / RTX 2080, Storage: 150GB SSD');

INSERT INTO game_genres (game_id, genre) VALUES 
(104308, 'Action'),
(104308, 'Adventure'),
(104308, 'Third Person Shooter');

INSERT INTO game_tags (game_id, tag) VALUES 
(104308, 'Western'),
(104308, 'Open World'),
(104308, 'Story Rich');

INSERT INTO game_features (game_id, feature) VALUES 
(104308, 'Single Player'),
(104308, 'Multiplayer'),
(104308, 'Achievements');

INSERT INTO game_images (game_id, image) VALUES 
(104308, 'https://images.igdb.com/igdb/image/upload/t_screenshot_big/sciqtz.jpg'),
(104308, 'https://images.igdb.com/igdb/image/upload/t_screenshot_big/sciu00.jpg');

-- The Witcher 3: Wild Hunt
INSERT INTO game (id, title, edition, price, cover_image, trailer_video, hero_video, description_video, description, story, system_requirements_min, system_requirements_recommended) VALUES 
(11365, 'The Witcher 3: Wild Hunt', 'Complete Edition', 39.99, 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1s9w.jpg', 'https://www.youtube.com/watch?v=cUROsWmfDkM', 'https://www.youtube.com/watch?v=cUROsWmfDkM', 'https://www.youtube.com/watch?v=cUROsWmfDkM', 'The Witcher 3: Wild Hunt is an open-world action RPG. As monster hunter Geralt of Rivia, you''ll make choices that shape the world around you.', 'Geralt of Rivia, a legendary monster slayer, sets out to find his lost love and his daughter who is the key to stopping an ancient evil.', 'OS: Windows 7 64-bit, RAM: 8GB, GPU: GeForce GTX 660 / Radeon HD 7870, Storage: 136GB', 'OS: Windows 8 64-bit, RAM: 16GB, GPU: GeForce GTX 1070 / Radeon RX 480, Storage: 136GB SSD');

INSERT INTO game_genres (game_id, genre) VALUES 
(11365, 'RPG'),
(11365, 'Action'),
(11365, 'Adventure');

INSERT INTO game_tags (game_id, tag) VALUES 
(11365, 'Open World'),
(11365, 'Dark Fantasy'),
(11365, 'Story Rich');

INSERT INTO game_features (game_id, feature) VALUES 
(11365, 'Single Player'),
(11365, 'Achievements'),
(11365, 'Cloud Saves');

INSERT INTO game_images (game_id, image) VALUES 
(11365, 'https://images.igdb.com/igdb/image/upload/t_screenshot_big/sciy9d.jpg'),
(11365, 'https://images.igdb.com/igdb/image/upload/t_screenshot_big/sciy9e.jpg');

-- God of War Ragnarök
INSERT INTO game (id, title, edition, price, cover_image, trailer_video, hero_video, description_video, description, story, system_requirements_min, system_requirements_recommended) VALUES 
(199680, 'God of War Ragnarök', 'Standard Edition', 69.99, 'https://images.igdb.com/igdb/image/upload/t_cover_big/co5jxw.jpg', 'https://www.youtube.com/watch?v=sXRVjLFVhEM', 'https://www.youtube.com/watch?v=sXRVjLFVhEM', 'https://www.youtube.com/watch?v=sXRVjLFVhEM', 'God of War Ragnarök is an action-adventure game. Kratos and Atreus must protect the Nine Realms from the impending end of all things.', 'Ragnarök is coming. As the prophesied end of the Nine Realms approaches, Kratos and his son Atreus must journey through the Nine Realms to prepare for the great battle.', 'OS: Windows 10 64-bit, RAM: 16GB, GPU: RTX 2070 / RX 5700XT, Storage: 130GB', 'OS: Windows 10 64-bit, RAM: 32GB, GPU: RTX 3080 / RX 6800XT, Storage: 130GB SSD');

INSERT INTO game_genres (game_id, genre) VALUES 
(199680, 'Action'),
(199680, 'Adventure'),
(199680, 'Third Person Shooter');

INSERT INTO game_tags (game_id, tag) VALUES 
(199680, 'Mythology'),
(199680, 'Norse'),
(199680, 'Story Rich');

INSERT INTO game_features (game_id, feature) VALUES 
(199680, 'Single Player'),
(199680, 'Achievements'),
(199680, 'Cloud Saves');

INSERT INTO game_images (game_id, image) VALUES 
(199680, 'https://images.igdb.com/igdb/image/upload/t_screenshot_big/scst8r.jpg'),
(199680, 'https://images.igdb.com/igdb/image/upload/t_screenshot_big/scst8s.jpg');

-- Halo Infinite
INSERT INTO game (id, title, edition, price, cover_image, trailer_video, hero_video, description_video, description, story, system_requirements_min, system_requirements_recommended) VALUES 
(115570, 'Halo Infinite', 'Standard Edition', 9.99, 'https://images.igdb.com/igdb/image/upload/t_cover_big/co3uax.jpg', 'https://www.youtube.com/watch?v=qLIpY_RLzOE', 'https://www.youtube.com/watch?v=qLIpY_RLzOE', 'https://www.youtube.com/watch?v=qLIpY_RLzOE', 'Halo Infinite is a free-to-play multiplayer first-person shooter. Experience the legendary saga of Spartan Master Chief.', 'Master Chief awakens on a Halo ring and must uncover the mysteries of this ancient installation and save humanity from extinction.', 'OS: Windows 10 64-bit, RAM: 8GB, GPU: GTX 960 / RX 570, Storage: 100GB', 'OS: Windows 10 64-bit, RAM: 16GB, GPU: RTX 2070 / RX 5700XT, Storage: 100GB SSD');

INSERT INTO game_genres (game_id, genre) VALUES 
(115570, 'FPS'),
(115570, 'Shooter'),
(115570, 'Action');

INSERT INTO game_tags (game_id, tag) VALUES 
(115570, 'Sci-Fi'),
(115570, 'Multiplayer'),
(115570, 'Free to Play');

INSERT INTO game_features (game_id, feature) VALUES 
(115570, 'Single Player'),
(115570, 'Multiplayer'),
(115570, 'Achievements');

INSERT INTO game_images (game_id, image) VALUES 
(115570, 'https://images.igdb.com/igdb/image/upload/t_screenshot_big/scdcaq.jpg'),
(115570, 'https://images.igdb.com/igdb/image/upload/t_screenshot_big/scdcar.jpg');
