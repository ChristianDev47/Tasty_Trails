# Fullstack Restaurant Ordering System

This project is a fully self-designed and implemented full-stack application intended for managing online restaurant orders. It includes both a backend API and a frontend interface, each built with different modern technologies to provide a robust, scalable, and user-friendly system.

## Project Overview

The system is composed of two primary parts:

1. **Backend - Express Restaurant API**: 
   - Built with **Node.js** and **Express**, this RESTful API manages all the server-side operations, including handling requests, processing data, and interacting with the database. 
   - The API features a **MySql** database and follows an **MVC (Model-View-Controller)** architecture to ensure maintainability and scalability.
   - It includes CRUD operations for various entities such as users, roles, orders, and dishes, along with authentication and authorization mechanisms.

   For detailed information on the backend, including setup and technologies used, refer to the [Express Restaurant API Documentation](https://github.com/ChristianDev47/Tasty_Trails/blob/master/Backend/README.md).

2. **Frontend - Restaurant Ordering Frontend**:
   - The frontend of the application is built with **Next.js** and **TypeScript**, providing a responsive and dynamic user interface. 
   - It offers functionalities such as user registration, login, browsing dishes, managing orders, and updating profiles.
   - The frontend uses **Tailwind CSS** for styling, **React Hook Form** for handling forms, and **Zod** for data validation.
   - It integrates seamlessly with the backend API to retrieve and manipulate data in real-time.

   For more details on the frontend, including setup instructions and technologies used, check out the [Restaurant Ordering Frontend Documentation](https://github.com/ChristianDev47/Tasty_Trails/blob/master/Frontend/README.md).

## Core Features

- **User Authentication**: Secure registration, login, and logout functionalities, managed through the backend API.
- **Order Management**: Full order management system allowing users to browse dishes, add them to a cart, and proceed to checkout.
- **Profile Management**: Users can update their profile information, manage addresses, and view their order history.
- **Responsive Design**: Ensures a seamless user experience across all devices, from desktops to mobile phones.
- **API Documentation and Testing**: Comprehensive API documentation and integration tests ensure the backend's reliability and maintainability.
- **Dockerization**: Both frontend and backend are Dockerized, allowing for consistent development and production environments.

## Technologies Used

### Backend:
- **Node.js**: The runtime environment for building the API.
- **Express**: The framework used for building the API's routes and middleware.
- **MySql**: The relational database system for storing persistent data.
- **Sequelize**: ORM for interacting with the MySql database.
- **JsonWebToken (JWT)**: For managing user authentication and permissions.

### Frontend:
- **Next.js**: The framework for building the frontend with server-side rendering.
- **TypeScript**: Provides static typing, ensuring better code quality.
- **Tailwind CSS**: A utility-first CSS framework for styling the application.
- **React Hook Form**: Simplifies form handling and validation.
- **Zod**: A schema validation library for ensuring data integrity.

## Project Structure

- The backend handles all server-side logic, including API endpoints, database interactions, and authentication.
- The frontend provides a dynamic and responsive user interface, interacting with the backend API to display and manage data.

Each part of the project is designed to be modular, allowing for easy maintenance, scaling, and future enhancements.

This project showcases a full-stack approach to building a modern web application, utilizing some of the most popular and powerful tools in web development.

## Demo

You can see the application in action here: [Tasty Trails Live Demo](https://google-translate-pink.vercel.app/).

![Tasty Trails](https://raw.githubusercontent.com/ChristianDev47/Tasty_Trails/refs/heads/master/Frontend/public/images/tasty_trails.webp)

