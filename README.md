# **Backend API Documentation**

## **Project Overview**
This backend application implements user authentication (signup and signin) and integrates a payment gateway with endpoints to create transaction tokens and check payment statuses. The application also features:
- JWT-based authentication with cookies for secure session management.
- Middleware for route protection.

---

## **Environment Setup**

### **Install Dependencies**
Run the following command to install dependencies:
```bash
npm install
```

### **Environment Variables**
Create a `.env` file in the root directory and include the following variables:
```env
PORT=8000
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=7d
PAYTM_MID=YOUR_PAYTM_MID
PAYTM_KEY=YOUR_PAYTM_KEY
PAYTM_WEBSITE=YOUR_PAYTM_WEBSITE
PAYTM_ENVIRONMENT=STAGING # or PRODUCTION
PAYTM_CLIENT_ID=YOUR_PAYTM_CLIENT_ID
PAYTM_CALLBACK_URL=https://yourdomain.com/api/v1/paymet/callback
```

Start the server:
```bash
npm start
```

---

## **API Endpoints**

### **1. User Signup**
**Endpoint:**  
`POST http://localhost:8000/api/v1/user/sign-up`

**Request Body:**
```json
{
  "name": "aditya sonsale",
  "email": "aditya@gmail.com",
  "password": "aditadit",
  "confirmPassword": "aditadit"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "User registered successfully!",
  "data": {
    "id": "unique_user_id",
    "name": "aditya sonsale",
    "email": "aditya@gmail.com"
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Passwords do not match."
}
```

---

### **2. User Signin**
**Endpoint:**  
`POST http://localhost:8000/api/v1/user/sign-in`

**Request Body:**
```json
{
  "email": "aditya@gmail.com",
  "password": "aditadit"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Login successful!",
  "token": "jwt_token_here",
  "user": {
    "id": "unique_user_id",
    "name": "aditya sonsale",
    "email": "aditya@gmail.com"
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Invalid email or password."
}
```

---

### **3. Create Transaction Token**
**Endpoint:**  
`POST http://localhost:8000/api/v1/paymet/createTransactionToken`

**Headers:**
```json
{
  "Authorization": "Bearer your_jwt_token_here"
}
```

**Request Body:**
```json
{
  "orderId": "ORDER12345",
  "amount": "100.00",
  "customerId": "CUST123",
  "email": "aditya@gmail.com",
  "mobile": "9876543210"
}
```

**Response (Success):**
```json
{
  "success": true,
  "token": {
    "txnToken": "abcdefgh12345678",
    "isPromoCodeApplied": false,
    "authenticated": true
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Invalid Paytm credentials or missing parameters."
}
```

---

### **4. Get Payment Status**
**Endpoint:**  
`POST http://localhost:8000/api/v1/paymet/getPaymentStatus`

**Headers:**
```json
{
  "Authorization": "Bearer your_jwt_token_here"
}
```

**Request Body:**
```json
{
  "orderId": "ORDER12345"
}
```

**Response (Success):**
```json
{
  "success": true,
  "status": {
    "resultInfo": {
      "resultStatus": "TXN_SUCCESS",
      "resultCode": "01",
      "resultMsg": "Transaction Successful"
    },
    "txnInfo": {
      "orderId": "ORDER12345",
      "txnId": "20231126123456",
      "txnAmount": "100.00",
      "currency": "INR",
      "status": "TXN_SUCCESS",
      "txnDate": "2024-11-26T10:00:00.000Z"
    }
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Transaction not found for orderId: ORDER12345"
}
```

---

## **Authentication Middleware**
The authentication middleware ensures only logged-in users can access payment-related endpoints (`/createTransactionToken` and `/getPaymentStatus`). If the user is not authenticated, the server responds with:
```json
{
  "success": false,
  "message": "Unauthorized access. Please login to continue."
}
```

---

## **JWT and Cookies**
- A **JWT token** is generated upon user login and sent as an HTTP-only cookie to the client.
- To make authenticated requests, include the token in the `Authorization` header:
  ```json
  {
    "Authorization": "Bearer your_jwt_token_here"
  }
  ```
- Cookies are used for browser access, ensuring secure storage of the session.

---

## **Project Contact**
**Name:** Aditya Sonsale  
**Email:** sonsaleaditya@gmail.com  
