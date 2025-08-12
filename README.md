## 🚀 Authentication Backend using Node.js, Express.js, and MongoDB

This project provides a robust backend for handling user authentication using **Node.js**, **Express.js**, and **MongoDB**. It includes features such as user registration, email verification, secure login/logout, password reset, and user profile retrieval.

---

### 📚 Features

✅ **User Registration:** Allows users to register and receive an email for verification.  
✅ **Email Verification:** Verifies user email via a token using **nodemailer** and **Mailtrap**.  
✅ **Login/Logout:** Handles user authentication with JWT tokens stored securely in cookies.  
✅ **Password Hashing:** Passwords are hashed securely using **bcryptjs** before storing.  
✅ **Access Token and Refresh Token:** Using concepts like Access Token and Refresh Token for better security and control.  
✅ **JWT Tokens:** Implements stateless session management using JWT (to generate access and refresh tokens).  
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

| Method | Endpoint                                     | Description                |
| ------ | -------------------------------------------- | -------------------------- |
| POST   | `BASE_URL/api/v1/user/register`              | Register a new user        |
| GET    | `BASE_URL/api/v1/user/verify/:token`         | Verify user email          |
| POST   | `BASE_URL/api/v1/user/login`                 | User login                 |
| GET    | `BASE_URL/api/v1/user/logout`                | User logout                |
| POST   | `BASE_URL/api/v1/user/forgot-password`       | Initiate password reset    |
| POST   | `BASE_URL/api/v1/user/reset-password/:token` | Reset user password        |
| GET    | `BASE_URL/api/v1/user/profile`               | Retrieve user profile data |

**Note**: Define BASE_URL (e.g. `http://localhost:3000`, your domain, etc) in .env

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

### 📡 API Documentation with Postman

To make testing the API easier, I’ve included a **Postman Collection** with all the available endpoints. You can import it into Postman and test the API directly.

**Note**: setup mailtrap for using or testing verification and reset password functionality. Also, make sure to update the credentials in `.env`.

#### 🔥 **How to Use the Collection**

1. **Download the Collection File:**

   - Grab the collection file from the GitHub repository:  
     [`api-docs/01_Auth.postman_collection.json`](https://github.com/Jasmin-Patel-2110/backend-projects/tree/main/api-docs/01_Auth.postman_collection.json)

2. **Import the Collection in Postman:**

   - Open Postman.
   - Click on `Import` in the top left corner.
   - Upload the `collection.json` file or paste the public link.

3. **Set Up Environment Variables:**  
   To make testing smoother, set these variables in Postman:

   ```bash
   BASE_URL = <your-base-url>
   ```

4. **Run and Test the API!** 🚀

---

### 📄 **Endpoints Included in the Collection**

- **User Registration:** `BASE_URL/api/v1/user/register`
- **Email Verification:** `BASE_URL/api/v1/user/verify/:token`
- **User Login:** `BASE_URL/api/v1/user/login`
- **User Logout:** `BASE_URL/api/v1/user/logout`
- **Password Reset Initiation:** `BASE_URL/api/v1/user/forgot-password`
- **Password Reset Confirmation:** `BASE_URL/api/v1/user/reset-password/:token`
- **Get User Profile:** `BASE_URL/api/v1/user/profile`

---

### ⚡ Notes

- Ensure MongoDB is running locally or remotely and accessible before starting the server.
- Populate all necessary environment variables in the `.env` file to avoid runtime errors.

---

### 📄 License

This project is licensed under the [MIT License](LICENSE).

---

✅ You're ready to go! If you encounter any issues, feel free to raise an issue or submit a pull request.
