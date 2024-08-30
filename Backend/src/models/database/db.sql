CREATE DATABASE IF NOT EXISTS restaurant;

USE restaurant;

CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(32) NOT NULL UNIQUE
);

CREATE TABLE person (   
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(32) NOT NULL,
    surname VARCHAR(32) NOT NULL,
    direction VARCHAR(255),
    phone VARCHAR(32)
);

CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role_id INT NOT NULL DEFAULT 2,
    person_id INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (person_id) REFERENCES person(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE access_token (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    token VARCHAR(255) NOT NULL UNIQUE,
    expiration DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE category(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(32) NOT NULL UNIQUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE dish (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    category_id INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    weight DECIMAL(10, 2) NOT NULL,
    calories DECIMAL(10, 2) NOT NULL,
    proteins DECIMAL(10, 2) NOT NULL,
    carbohydrates DECIMAL(10, 2) NOT NULL,
    fats DECIMAL(10, 2) NOT NULL,
    saturated_fats DECIMAL(10, 2) NOT NULL,
    sugars DECIMAL(10, 2) NOT NULL,
    dietary_fiber DECIMAL(10, 2) NOT NULL,
    description VARCHAR(1023),
    image VARCHAR(1023) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE order_status (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(32) NOT NULL UNIQUE
);


CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    order_status_id INT NOT NULL DEFAULT 1,
    direction VARCHAR(255) NOT NULL,
    phone VARCHAR(32) NOT NULL,
    total DECIMAL(10, 2),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (order_status_id) REFERENCES order_status(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE order_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    dish_id INT NOT NULL,
    count INT NOT NULL DEFAULT 1,
    price  DECIMAL(10, 2),
    UNIQUE KEY (order_id, dish_id),
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (dish_id) REFERENCES dish(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE dish_status (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(32) NOT NULL UNIQUE
);

CREATE TABLE menu_dishes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    dish_id INT NOT NULL,
    dish_status_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (dish_id) REFERENCES dish(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (dish_status_id) REFERENCES dish_status(id)
);

-- ==========TRIGGERS==============
DELIMITER //
CREATE TRIGGER order_details_set_price BEFORE INSERT ON order_details FOR EACH ROW
BEGIN
    SET NEW.price = (SELECT price FROM dish WHERE dish.id = NEW.dish_id);
    UPDATE orders
    SET total = NEW.price * NEW.count + IFNULL(total, 0)
    WHERE id = NEW.order_id;
END;
//
DELIMITER ;

-- ==========INSERTING=============
INSERT INTO role (name) VALUES ('Administrador'), ('Cliente');

INSERT INTO order_status (name) VALUES ('Pendiente'), ('Aprobado'), ('Enviando'), ('Entregado'), ('Cancelado');

INSERT INTO dish_status (name) VALUES ('Disponible'), ('Agotado');

INSERT INTO category (name) VALUES ('Sopas'), ('Principales'), ('Ensaladas'), ('Postres'), ('Veganos'), ('Especiales');
