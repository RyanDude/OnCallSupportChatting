create table if not EXISTS admin(
    id int PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255)
);