-- =========================================================
-- Archivo SQL para insertar DOOM (2016) según tu entity
-- =========================================================

-- Insertar juego principal
INSERT INTO game
(title, edition, price, cover_image, trailer_video, hero_video, description_video, description, story, system_requirements_min, system_requirements_recommended)
VALUES
(
    'DOOM (2016)',
    'Deluxe Edition',
    19.99,
    '/assets/images/doom-2016.jpg',
    '/assets/videos/doom-trailer.mp4',
    '/assets/videos/doomfondo.mp4',
    '/assets/videos/doom-description.mp4',
    'Developed by id Software, the studio that pioneered the first-person shooter genre and created multiplayer Deathmatch, DOOM returns as a brutally fun and challenging modern-day shooter experience. Relentless demons, impossibly destructive guns, and fast, fluid movement provide the foundation for intense, first-person combat.',
    'You’ve come here for a reason. The Union Aerospace Corporation’s massive research facility on Mars is overwhelmed by fierce and powerful demons, and only one person stands between their world and ours. As the lone DOOM Marine, you’ve been activated to do one thing – kill them all.',
    'OS: Windows 10; Processor: Intel Core i5-2400 / AMD FX-8320 or better; Memory: 8GB RAM; Graphics: NVIDIA GTX 670 / AMD Radeon HD 7870; DirectX: Version 11; Storage: 55 GB available space',
    'OS: Windows 10 / 11; Processor: Intel Core i7-3770 / AMD FX-8350 or better; Memory: 8GB RAM; Graphics: NVIDIA GTX 970 / AMD Radeon R9 290; DirectX: Version 11; Storage: 55 GB available space'
);

-- =========================================================
-- Recuperar el game_id recién insertado dinámicamente
-- =========================================================
SET @gameId = (SELECT id FROM game WHERE title='DOOM (2016)');

-- =========================================================
-- Imágenes
-- =========================================================
INSERT INTO game_images (game_id, image) VALUES (@gameId, '/assets/images/doom-2016.jpg');
INSERT INTO game_images (game_id, image) VALUES (@gameId, '/assets/images/doom/doom1.jpg');
INSERT INTO game_images (game_id, image) VALUES (@gameId, '/assets/images/doom/doom2.jpg');
INSERT INTO game_images (game_id, image) VALUES (@gameId, '/assets/images/doom/doom3.jpg');
INSERT INTO game_images (game_id, image) VALUES (@gameId, '/assets/images/doom/doom4.jpg');
INSERT INTO game_images (game_id, image) VALUES (@gameId, '/assets/images/doom/doom5.jpg');
INSERT INTO game_images (game_id, image) VALUES (@gameId, '/assets/images/doom/doom6.jpg');
INSERT INTO game_images (game_id, image) VALUES (@gameId, '/assets/images/doom/doom7.jpg');

-- =========================================================
-- Géneros
-- =========================================================
INSERT INTO game_genres (game_id, genre) VALUES (@gameId, 'Shooter');
INSERT INTO game_genres (game_id, genre) VALUES (@gameId, 'FPP');
INSERT INTO game_genres (game_id, genre) VALUES (@gameId, 'Sci-fi');

-- =========================================================
-- Tags
-- =========================================================
INSERT INTO game_tags (game_id, tag) VALUES (@gameId, 'Atmospheric');
INSERT INTO game_tags (game_id, tag) VALUES (@gameId, 'Sci-fi');
INSERT INTO game_tags (game_id, tag) VALUES (@gameId, 'Science');
INSERT INTO game_tags (game_id, tag) VALUES (@gameId, 'First-Person');
INSERT INTO game_tags (game_id, tag) VALUES (@gameId, 'Great Soundtrack');

-- =========================================================
-- Features
-- =========================================================
INSERT INTO game_features (game_id, feature) VALUES (@gameId, 'Achievements');
INSERT INTO game_features (game_id, feature) VALUES (@gameId, 'Cloud saves');
INSERT INTO game_features (game_id, feature) VALUES (@gameId, 'Controller support');
INSERT INTO game_features (game_id, feature) VALUES (@gameId, 'Single-player');