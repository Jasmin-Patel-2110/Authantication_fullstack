# Backend only projects

## 1. 🚀 Authentication Backend using Node.js, Express.js, and MongoDB (Basic)

This project provides a robust backend for handling user authentication using **Node.js**, **Express.js**, and **MongoDB**. It includes features such as user registration, email verification, secure login/logout, password reset, and user profile retrieval.

---

### 📚 Features

✅ **User Registration:** Allows users to register and receive an email for verification.  
✅ **Email Verification:** Verifies user email via a token using **nodemailer** and **Mailtrap**.  
✅ **Login/Logout:** Handles user authentication with JWT tokens stored securely in cookies.  
✅ **Password Hashing:** Passwords are hashed securely using **bcryptjs** before storing.  
✅ **JWT Tokens:** Implements stateless session management using JWT.  
✅ **Password Reset:** Allows users to reset their passwords through a token sent via email.  
✅ **Profile Route:** Provides an endpoint to retrieve user profile information.

---

### 🛠️ Technologies and Libraries

This project leverages the following technologies:

- **Node.js** – JavaScript runtime environment.
- **Express.js** – Web framework for building RESTful APIs.
- **MongoDB** – NoSQL database for storing user data.
- **mongoose** – To interact with MongoDB.
- **Nodemailer & Mailtrap** – For email verification and password reset.
- **JWT (jsonwebtoken)** – To generate and verify tokens for authentication.
- **bcryptjs** – For password hashing.
- **dotenv** – To manage environment variables.
- **crypto** – For generating secure tokens.

---

### 📡 API Endpoints

The backend exposes the following endpoints:

| Method | Endpoint                             | Description                |
| ------ | ------------------------------------ | -------------------------- |
| POST   | `/api/v1/user/register`              | Register a new user        |
| GET    | `/api/v1/user/verify/:token`         | Verify user email          |
| POST   | `/api/v1/user/login`                 | User login                 |
| POST   | `/api/v1/user/logout`                | User logout                |
| POST   | `/api/v1/user/forgot-password`       | Initiate password reset    |
| POST   | `/api/v1/user/reset-password/:token` | Reset user password        |
| GET    | `/api/v1/user/profile`               | Retrieve user profile data |

---

### 🚀 Getting Started

#### 1. Clone the Repository

```bash
git clone https://github.com/Jasmin-Patel-2110/backend-projects.git
cd backend-projects
```

#### 2. Install Dependencies

```nginx
npm install
```

#### 3. Configure Environment Variables

- Create a `.env` file based on the `.env.example` file provided.

#### 4. Start the Server

```nginx
npm run dev
```

The server will run on `http://localhost:3000` by default.

---

### ⚡ Notes

- Ensure MongoDB is running locally or remotely and accessible before starting the server.
- Populate all necessary environment variables in the `.env` file to avoid runtime errors.

---

### 📄 License

This project is licensed under the [MIT License](LICENSE).

---

✅ You're ready to go! If you encounter any issues, feel free to raise an issue or submit a pull request.
