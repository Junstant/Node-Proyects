# Studemio Backend

Studemio Backend is the server layer of the educational management platform. This project leverages modern backend development technologies to provide a robust and efficient API that supports all application functionalities.

## 🚀 Features

- Modular and scalable structure for easy maintenance and extension.
- Secure authentication and authorization with JSON Web Tokens (JWT).
- Password encryption using bcrypt to protect user data.
- Efficient database management with Mongoose and MongoDB.
- Centralized configuration for development and production environments using dotenv.
- Centralized error handling for better debugging and client experience.
- Integration with email services via Nodemailer.
- Customizable middleware for roles and API keys.
- RESTful routes for all main entities (users, subjects, modules, etc.).
- Robust data validation with reusable methods and utilities.
- Clear API documentation to facilitate frontend integration.

## 🔧 Technologies Used

- **Node.js**: Server-side JavaScript runtime environment.
- **Express.js**: Minimalist framework for building web applications.
- **Mongoose**: ODM (Object Data Modeling) for MongoDB.
- **JSON Web Tokens (JWT)**: For secure authentication.
- **bcrypt**: Password encryption.
- **Nodemailer**: Email sending service.
- **dotenv**: Environment variable management.
- **CORS**: Controlled access across different domains.

## 📦 Installation

Follow these steps to clone and install the project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/Junstant/Node-Proyects.git
   ```

2. Navigate to the backend directory:

   ```bash
   cd Node-Proyects/06-Studemio-Back
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

## ▶️ Running the Project

To start the server in development mode:

```bash
npm run dev
```

The server will be available at `http://localhost:3000` (or the port configured in your environment).

To start the server in production mode:

```bash
npm start
```

## 🔗 Configuration

Make sure to set up the environment variables in a `.env` file. Example:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/studemio
JWT_SECRET=your_secret
EMAIL_USER=your_email
EMAIL_PASS=your_password
```

Thank you for visiting this project! If you have any questions or suggestions, feel free to create an issue or contact me directly.
