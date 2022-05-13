INSERT INTO user (name, email, password, location)
VALUES ('Mario', 'mariohamameh97@gmail.com', '$2a$10$xO3hu6O3E8YorPzQqKyMyuSZoAyG9VQKfO4GePL//eZMhv9lNAl8K', 1), -- password: 123
('Paul', 'helloworld@gmail.com', '$2a$10$AVJo72tvzwAbpOedf0Seeumv0NcRYO8amvP4126nKHRofYWqHDw3q', 2), -- password: 1234
('May', 'may99@gmail.com', '$2a$10$wI9YTZFzPtNHpo48HccTEObEvZ7.gNdZbQyMJNtucarXY81G5qOyK', 3); -- password: 12345


INSERT INTO location (lng, lat)
VALUES (-71.50234985351562, 43.62677001953125), 
(-122.0357894897461, 38.00468826293945),
(-118.55348205566406, 34.23881149291992);


INSERT INTO profile (user_id, pet_name, size, breed, species, age, picture)
VALUES (1, 'Max', 'Medium', 'Golden retriever', 'Dog', 2, https://i.imgur.com/WGYxLU0.jpeg),
(2, 'Buster', 'Small', 'Border Collie', 'Dog', 1, https://i.imgur.com/2HeX8GF.jpeg),
(3, 'Poodle', 'Medium', 'Poodle', 'Dog', 3, https://i.imgur.com/mlYFtTi.jpeg);


INSERT INTO conversation (user_id, chat_id)
VALUES (1, 1),
(2, 2),
(3, 3);

INSERT INTO chat (message, message_date)
VALUES('HELLO WORLD!', 2022-05-13 11:23:11),
('asdgasdgsdf', 2022-05-13 12:03:11),
('blablabla', 2022-05-13 10:04:01),
