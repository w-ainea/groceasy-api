BEGIN TRANSACTION;

INSERT INTO categories (imgurl, name) 
VALUES
('http://res.cloudinary.com/djmhxyvtg/image/upload/v1612463057/wnm7tbreeqjzuxlttokb.png', 'Vegetables'),
('http://res.cloudinary.com/djmhxyvtg/image/upload/v1612463107/pvwo8xmx61n6m4dfffkp.png', 'Fruits'),
('http://res.cloudinary.com/djmhxyvtg/image/upload/v1612463129/exmttmj42f9bwqpnbb5i.png', 'Spices'),
('http://res.cloudinary.com/djmhxyvtg/image/upload/v1612463177/co7ri9kstwh2euintoxi.png', 'Others');


INSERT INTO register(email, hash)
VALUES
('joyce@gmail.com', '$2b$10$sr8pPDjr./iu5fFjqZ/lWOvgWiP6XTj.gV/4aWidTQ6MXrITZ5Upy');

INSERT INTO users(email, username, joined)
VALUES ('joyce@gmail.com', 'joyce', '2021-02-08');

INSERT INTO products(product_name, price, category, quantity, imgurl, user_id) 
VALUES
('Papaya', 50, 'Fruits', 100, 'http://res.cloudinary.com/djmhxyvtg/image/upload/v1612769438/ejbbc0spyeu50rxhzr7k.jpg', 1),
('Strawberry', 100, 'Fruits', 5, ' http://res.cloudinary.com/djmhxyvtg/image/upload/v1612769531/lsxhb5o3bw6vt6a7op5l.jpg', 1),
('Tumeric', 50, 'Spices', 5, 'http://res.cloudinary.com/djmhxyvtg/image/upload/v1612769721/tip1tmhh2tjpd9pyuhh3.jpg', 1),
('Cabbage', 20, 'Vegetables', 80, 'http://res.cloudinary.com/djmhxyvtg/image/upload/v1612769885/ps9bq307fjrkujfd3cwp.jpg', 1);

COMMIT;
