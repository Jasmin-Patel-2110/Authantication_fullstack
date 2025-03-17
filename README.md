# Backend only projects

## 1. Authentication Backend using Node.js, Express.js, and MongoDB

This project contains a Node.js backend for handling authentication using Express.js and MongoDB. It includes various features such as registration, email verification, login/logout functionality, password hashing, JWT token management, password reset, and a profile route.

### Features

- **Registration:** Allows users to register with email verification.
- **Verification:** Email verification using nodemailer and Mailtrap.
- **Login/Logout:** Handles user authentication with JWT tokens stored in cookies.
- **Password Hashing:** Securely hashes passwords before storing them in MongoDB.
- **Stateless Sessions:** Uses JWT tokens for stateless session management.
- **Forgot/Reset Password:** Functionality for resetting passwords via email verification.
- **Profile Route:** Retrieves user data for the profile page.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Jasmin-Patel-2110/backend-projects.git
```

2. Install dependencies:

```nginx
npm install
```

3. Set up environment variables:

- Create a `.env` file based on `.env.example` and configure it with your MongoDB connection URI, JWT secret, and email credentials for Mailtrap.

4. Run the server:

```nginx
npm run dev
```

## Usage

Ensure MongoDB is running and accessible before starting the server.Also fill required environment variables in `.env` file given in `.env.sample` file.

The backend will run on `http://localhost:3000` by default (set port in `.env` file for port of your choice).
