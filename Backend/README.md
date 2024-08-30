# Express Restaurant API

A robust restaurant API built with Node.js and Express, designed to manage online orders efficiently. It features a MySql database and follows an MVC (Model-View-Controller) architecture for clear and maintainable code organization.

## Core Features
The API provides CRUD operations (Create, Read, Update, Delete) for managing various entities within the system:

- **Roles**: Manage user roles within the system.
- **Persons**: Handle user personal information.
- **Users**: Register and authenticate users via email addresses.
- **Access Tokens**: Manage permissions and authentication through access tokens.
- **Categories**: Organize menu items by categories.
- **Dishes**: Manage the available dishes in the menu.
- **Order Statuses**: Track and update the status of orders.
- **Order Details**: Manage the specific items within each order.
- **Dish Statuses**: Control the current availability of dishes (available, out of stock, etc.).
- **Menu Dishes**: Manage the dishes that are part of the restaurant’s menu.

### Additional Features
- **User Registration**: Allows new users to register using their email addresses.
- **User Authentication**: Secure login and logout functionality with session management.
- **Permissions and Roles**: Implement a role-based permission system using access tokens, assigning different roles to users.
- **API Documentation**: Detailed API documentation generated automatically using Swagger.
- **Integration Tests**: Automated tests to ensure the API's functionality.
- **Dockerization**: The API is Dockerized for consistent local development and production environments.

## Technologies Used
- **Node.js**: Core platform for running the server.
- **Express**: Framework used for building the API.
- **Bcrypt**: Utilized for secure password encryption.
- **JsonWebToken (JWT)**: Manages authentication and permissions via JWT tokens.
- **Cloudinary**: Storage and management of images.
- **Multer**: Middleware for handling file uploads.
- **MySql**: Relational database for storing system data.
- **Nodemon**: Tool for automatic server reload during development.
- **Sequelize**: ORM (Object-Relational Mapping) for interacting with the MySql database.
- **Swagger**: Tool for creating interactive API documentation.
- **Zod**: Library for data validation.
- **Jest**: Testing framework used for unit and integration tests.
- **Supertest**: Tool for HTTP testing of the API.
- **Docker**: Containerization of the application to ensure a consistent environment in both development and production.

This API is designed to be scalable, secure, and easy to maintain, providing all the necessary tools for efficiently managing an online restaurant.

## ER Diagram
Here is the Entity-Relationship diagram of the DataBase

![ER-Diagram](https://raw.githubusercontent.com/ChristianDev47/Tasty_Trails/refs/heads/master/Backend/src/models/database/diagram/ER_Diagram.png)
