-- Insert Triple A Games
-- Elden Ring
INSERT INTO game (id, title, edition, price, is_on_sale, discount_percentage, cover_image, trailer_video, hero_video, description_video, description, story, system_requirements_min, system_requirements_recommended) VALUES 
(262060, 'Elden Ring', 'Standard Edition', 59.99, false, 0.0, 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2waq.jpg', 'https://www.youtube.com/watch?v=e8f2F2rnbYU', 'https://www.youtube.com/watch?v=e8f2F2rnbYU', 'https://www.youtube.com/watch?v=e8f2F2rnbYU', 'Elden Ring es una colaboración entre FromSoftware y George R. R. Martin. Levántate, Tarnished, y que la gracia te guíe en tu nueva aventura en las Tierras Intermedias.', 'La gracia ha sido cortada y dispersada por las Tierras. Eres el Señor del Elden.', 'OS: Windows 10 64-bit, RAM: 12GB, GPU: GTX 1070 / RX 5600XT, Storage: 60GB', 'OS: Windows 10 64-bit, RAM: 16GB, GPU: RTX 2080 / RX 5700XT, Storage: 60GB SSD');

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
INSERT INTO game (id, title, edition, price, is_on_sale, discount_percentage, cover_image, trailer_video, hero_video, description_video, description, story, system_requirements_min, system_requirements_recommended) VALUES 
(115288, 'Baldur''s Gate 3', 'Standard Edition', 59.99, true, 20.0, 'https://images.igdb.com/igdb/image/upload/t_cover_big/co5hoy.jpg', 'https://www.youtube.com/watch?v=GfqJbk8Tg0s', 'https://www.youtube.com/watch?v=GfqJbk8Tg0s', 'https://www.youtube.com/watch?v=GfqJbk8Tg0s', 'Baldur''s Gate 3 es un RPG rico en historia, basado en turnos y ambientado en el mundo de D&D 5e. ¡Reúne a tu grupo y aventúrate!', 'Un renacuajo ha sido plantado en tu cerebro. Debes actuar rápidamente para encontrar una cura, pero al hacerlo, podrías descubrir algo mucho más siniestro.', 'OS: Windows 10 64-bit, RAM: 8GB, GPU: GTX 960 / RX 560, Storage: 150GB', 'OS: Windows 10 64-bit, RAM: 16GB, GPU: RTX 2070 / RX 5700XT, Storage: 150GB SSD');

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
INSERT INTO game (id, title, edition, price, is_on_sale, discount_percentage, cover_image, trailer_video, hero_video, description_video, description, story, system_requirements_min, system_requirements_recommended) VALUES 
(155437, 'Cyberpunk 2077', 'Standard Edition', 39.99, false, 0.0, 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1xct.jpg', 'https://www.youtube.com/watch?v=UKHv8pNzSu4', 'https://www.youtube.com/watch?v=UKHv8pNzSu4', 'https://www.youtube.com/watch?v=UKHv8pNzSu4', 'Cyberpunk 2077 es un RPG de acción de mundo abierto ambientado en el oscuro futuro de Night City. Juega como V, un forajido intentando sobrevivir en la metrópolis futurista.', 'Conviértete en un mercenario legendario en Night City. Crea tu personaje y embarcate en una aventura que cambiará tu vida en la vibrante y distópica metrópolis del futuro lejano.', 'OS: Windows 7/10 64-bit, RAM: 8GB, GPU: GTX 780 / RX 470, Storage: 70GB', 'OS: Windows 10 64-bit, RAM: 16GB, GPU: RTX 2070 / RX 5700XT, Storage: 70GB SSD');

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
(383025, 'The Legend of Zelda: Tears of the Kingdom', 'Standard Edition', 69.99, 'https://images.igdb.com/igdb/image/upload/t_cover_big/co5p6h.jpg', 'https://www.youtube.com/watch?v=gUDIe-fRJMo', 'https://www.youtube.com/watch?v=gUDIe-fRJMo', 'https://www.youtube.com/watch?v=gUDIe-fRJMo', 'Una épica aventura te espera en The Legend of Zelda: Tears of the Kingdom. Explora un vasto mundo, resuelve acertijos y lucha contra enemigos en tu misión por salvar a Zelda.', 'Zelda ha desaparecido. Una oscuridad profunda ha cubierto Hyrule. Link debe descubrir la verdad para salvarla a ella y al reino.', 'OS: Nintendo Switch', 'OS: Nintendo Switch (Recomendado: firmware más reciente)');

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
(220519, 'Starfield', 'Standard Edition', 69.99, 'https://images.igdb.com/igdb/image/upload/t_cover_big/co5qkz.jpg', 'https://www.youtube.com/watch?v=zmZiepYXmks', 'https://www.youtube.com/watch?v=zmZiepYXmks', 'https://www.youtube.com/watch?v=zmZiepYXmks', 'Starfield es la próxima generación de exploración espacial. Explora una vasta galaxia, completa misiones y descubre los misterios del cosmos.', 'Despiertas en una instalación minera sin recordar cómo llegaste allí. Tu viaje a través de las estrellas comienza.', 'OS: Windows 10/11 64-bit, RAM: 16GB, GPU: RTX 2060 / RX 5700, Storage: 125GB', 'OS: Windows 10/11 64-bit, RAM: 32GB, GPU: RTX 2080 / RTX 3080, Storage: 125GB SSD');

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
(303212, 'Final Fantasy XVI', 'Standard Edition', 69.99, 'https://images.igdb.com/igdb/image/upload/t_cover_big/co5j9x.jpg', 'https://www.youtube.com/watch?v=mGdqEXLXjcI', 'https://www.youtube.com/watch?v=mGdqEXLXjcI', 'https://www.youtube.com/watch?v=mGdqEXLXjcI', 'Final Fantasy XVI es una aventura llena de acción en el mundo de Valisthea. Juega como Clive, un guerrero en una búsqueda de venganza y verdad.', 'Clive debe descubrir los misterios de los dominantes y la amenaza de los eikons mientras lucha por salvar a Valisthea de la destrucción.', 'OS: Windows 10 64-bit, RAM: 16GB, GPU: RTX 2070 / RX 5700XT, Storage: 150GB', 'OS: Windows 10 64-bit, RAM: 32GB, GPU: RTX 3080 / RX 6800XT, Storage: 150GB SSD');

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
(228409, 'Hogwarts Legacy', 'Standard Edition', 49.99, 'https://images.igdb.com/igdb/image/upload/t_cover_big/co5gul.jpg', 'https://www.youtube.com/watch?v=1O6Qstncpnc', 'https://www.youtube.com/watch?v=1O6Qstncpnc', 'https://www.youtube.com/watch?v=1O6Qstncpnc', 'Experimenta la vida como estudiante en Hogwarts Escuela de Magia y Hechicería. Explora el castillo, domina la magia y descubre secretos en el mundo mágico.', 'Eres un estudiante rezagado que ha llegado a Hogwarts con un don especial. Descubre la verdad sobre la magia antigua y tu papel en el mundo de la magia.', 'OS: Windows 10 64-bit, RAM: 8GB, GPU: GTX 960 / RX 570, Storage: 100GB', 'OS: Windows 10 64-bit, RAM: 16GB, GPU: RTX 2070 / RX 5700XT, Storage: 100GB SSD');

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
(26286, 'The Legend of Zelda: Breath of the Wild', 'Standard Edition', 59.99, 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1rq7.jpg', 'https://www.youtube.com/watch?v=1rPxiXXxftE', 'https://www.youtube.com/watch?v=1rPxiXXxftE', 'https://www.youtube.com/watch?v=1rPxiXXxftE', 'Explora el reino de Hyrule en The Legend of Zelda: Breath of the Wild. Una aventura expansiva y al aire libre te espera en un mundo lleno de misterio y peligro.', 'Link debe despertar de un siglo de sueño para derrotar al Calamity Ganon y salvar a la Princesa Zelda y el reino de Hyrule.', 'OS: Nintendo Switch', 'OS: Nintendo Switch (Recomendado: firmware más reciente)');

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
(104308, 'Red Dead Redemption 2', 'Standard Edition', 59.99, 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1sre.jpg', 'https://www.youtube.com/watch?v=eaQc5-DVGiU', 'https://www.youtube.com/watch?v=eaQc5-DVGiU', 'https://www.youtube.com/watch?v=eaQc5-DVGiU', 'Red Dead Redemption 2 es un juego de acción y aventura ambientado en un mundo expansivo y atmosférico. Experimenta la épica historia del forajido Arthur Morgan.', 'Arthur Morgan y la banda Van der Linde se ven obligados a robar, hurtar y luchar para sobrevivir en el duro desierto del norte de América. A medida que la civilización se acerca a su forma de vida, la banda debe planear un robo masivo para asegurar su futuro.', 'OS: Windows 10 64-bit, RAM: 8GB, GPU: GTX 960 / GTX 1050 Ti, Storage: 150GB', 'OS: Windows 10 64-bit, RAM: 16GB, GPU: RTX 2060 / RTX 2080, Storage: 150GB SSD');

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
(11365, 'The Witcher 3: Wild Hunt', 'Complete Edition', 39.99, 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1s9w.jpg', 'https://www.youtube.com/watch?v=cUROsWmfDkM', 'https://www.youtube.com/watch?v=cUROsWmfDkM', 'https://www.youtube.com/watch?v=cUROsWmfDkM', 'The Witcher 3: Wild Hunt es un RPG de acción de mundo abierto. Como cazador de monstruos Geralt de Rivia, harás elecciones que moldearán el mundo que te rodea.', 'Geralt de Rivia, un legendario cazador de monstruos, se propone encontrar a su amor perdido e hija que es la clave para detener un mal antiguo.', 'OS: Windows 7 64-bit, RAM: 8GB, GPU: GeForce GTX 660 / Radeon HD 7870, Storage: 136GB', 'OS: Windows 8 64-bit, RAM: 16GB, GPU: GeForce GTX 1070 / Radeon RX 480, Storage: 136GB SSD');

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
(199680, 'God of War Ragnarök', 'Standard Edition', 69.99, 'https://images.igdb.com/igdb/image/upload/t_cover_big/co5jxw.jpg', 'https://www.youtube.com/watch?v=sXRVjLFVhEM', 'https://www.youtube.com/watch?v=sXRVjLFVhEM', 'https://www.youtube.com/watch?v=sXRVjLFVhEM', 'God of War Ragnarök es un juego de acción y aventura. Kratos y Atreus deben proteger los Nueve Reinos de la inminente fin de todas las cosas.', 'Ragnarök está llegando. A medida que se acerca el fin profetizado de los Nueve Reinos, Kratos y su hijo Atreus deben viajar a través de los Nueve Reinos para prepararse para la gran batalla.', 'OS: Windows 10 64-bit, RAM: 16GB, GPU: RTX 2070 / RX 5700XT, Storage: 130GB', 'OS: Windows 10 64-bit, RAM: 32GB, GPU: RTX 3080 / RX 6800XT, Storage: 130GB SSD');

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
(115570, 'Halo Infinite', 'Standard Edition', 9.99, 'https://images.igdb.com/igdb/image/upload/t_cover_big/co3uax.jpg', 'https://www.youtube.com/watch?v=qLIpY_RLzOE', 'https://www.youtube.com/watch?v=qLIpY_RLzOE', 'https://www.youtube.com/watch?v=qLIpY_RLzOE', 'Halo Infinite es un tirador de primera persona multijugador gratuito. Experimenta la legendaria saga del Soldado Maestro Chief.', 'El Maestro Chief despierta en un anillo Halo y debe descubrir los misterios de esta antigua instalación y salvar a la humanidad de la extinción.', 'OS: Windows 10 64-bit, RAM: 8GB, GPU: GTX 960 / RX 570, Storage: 100GB', 'OS: Windows 10 64-bit, RAM: 16GB, GPU: RTX 2070 / RX 5700XT, Storage: 100GB SSD');

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
