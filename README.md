# Node.js Projects Repository

This repository contains multiple Node.js projects, each demonstrating different aspects of Node.js development, including Express, Mongoose, Handlebars, and more.

## Project Structure


### 01 Mongoose Practice

This project demonstrates the use of Mongoose for MongoDB interactions. It includes user management functionalities such as creating, updating, and deleting users.

- **index.js**: Entry point of the application.
- **managers/users.manager.js**: Contains functions for user management.
- **models/user.model.js**: Defines the user schema.
- **config/mongoDB.config.js**: MongoDB configuration.
- **constants/errors.js**: Custom error handling.

### 02 Node B Express

This project is a basic Express application demonstrating simple API endpoints.

- **index.js**: Entry point of the application.
- **usuarios.json**: JSON file to store user data.

### 03 userRouter Express

This project demonstrates the use of Express routers and a custom response builder utility.

- **server.js**: Entry point of the application.
- **routes/user.routes.js**: Defines user-related routes.
- **utils/ResponseBuilder.utils.js**: Utility for building standardized API responses.
- **repositories/user.repositories.js**: Functions for interacting with user data.

### 04 Node HandleBars

This project demonstrates the use of Handlebars as a templating engine with Express.

- **server.js**: Entry point of the application.
- **views/**: Contains Handlebars templates.
- **public/**: Static files.

### 05 Node Express API Products

This project demonstrates a RESTful API for managing products using Express.

- **routes/EndPoins.routes.js**: Defines product-related routes.
- **utils/JsonManager.utils.js**: Utility functions for managing JSON data.
- **public/Products.public.json**: JSON file to store product data.

### 06 Node Diplomate Final

This project is a final project for a Node.js course, demonstrating advanced features and best practices.

- **src/config/enviroment.config.js**: Environment configuration using dotenv.

## Getting Started

To get started with any of these projects, navigate to the project directory and install the dependencies:

```sh
cd <project-directory>
npm install