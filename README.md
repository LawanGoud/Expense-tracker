# Personal Expense Tracker API

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technologies Used](#technologies-used)
3. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
4. [Database Setup](#database-setup)
5. [API Endpoints](#api-endpoints)
   - [POST /transactions](#post-transactions)
   - [GET /transactions](#get-transactions)
   - [GET /transactions/:id](#get-transactionsid)
   - [PUT /transactions/:id](#put-transactionsid)
   - [DELETE /transactions/:id](#delete-transactionsid)
   - [GET /summary](#get-summary)
6. [Error Handling](#error-handling)
7. [Testing with Postman](#testing-with-postman)

## Project Overview

The Personal Expense Tracker API allows users to manage their personal financial records by recording income and expenses, retrieving past transactions, and generating summaries by category or time period.

## Technologies Used

- **Node.js**: JavaScript runtime environment for building the backend.
- **Express.js**: Web framework for building the API.
- **MongoDB**: NoSQL database for storing transactions and categories (or SQLite for relational storage).
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **dotenv**: Module to load environment variables from a `.env` file.

## Getting Started

### Prerequisites

- Node.js (version 12 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Postman (for testing API endpoints)

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/LawanGoud/Expense-tracker.git
   cd expense-tracker
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory and add the following:

   ```plaintext
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/?directConnection=true
   ```

4. **Start the Server**:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3000`.

## Database Setup

The application uses MongoDB for storing transactions and categories. Make sure MongoDB is running locally, or configure the connection string in the `.env` file for MongoDB Atlas.

### Collections

- **transactions**: Stores all financial transactions.
- **categories**: Stores different categories for income and expenses.

## API Endpoints

### POST /transactions

Adds a new transaction (income or expense).

**Request Body**:

```json
{
  "type": "income/expense",
  "category": "string",
  "amount": "number",
  "date": "YYYY-MM-DD",
  "description": "string"
}
```

**Response**:

- Status: `201 Created`
- Body: Newly created transaction object.

### GET /transactions

Retrieves all transactions.

**Response**:

- Status: `200 OK`
- Body: Array of transaction objects.

### GET /transactions/:id

Retrieves a transaction by its ID.

**Response**:

- Status: `200 OK`
- Body: Transaction object.

### PUT /transactions/:id

Updates a transaction by its ID.

**Request Body** (optional fields):

```json
{
  "type": "income/expense",
  "category": "string",
  "amount": "number",
  "date": "YYYY-MM-DD",
  "description": "string"
}
```

**Response**:

- Status: `200 OK`
- Body: Updated transaction object.

### DELETE /transactions/:id

Deletes a transaction by its ID.

**Response**:

- Status: `204 No Content`
- Body: No response body.

### GET /summary

Retrieves a summary of transactions, including total income, total expenses, and balance. Optionally, filter by date range or category.

**Query Parameters** (optional):

- `startDate`: Filter transactions starting from this date.
- `endDate`: Filter transactions up to this date.
- `category`: Filter by a specific category.

**Response**:

- Status: `200 OK`
- Body: Summary object with totals.

## Error Handling

The API handles common errors, including:

- Invalid transaction ID: Returns `404 Not Found`.
- Validation errors: Returns `400 Bad Request` with error messages.
- Internal server errors: Returns `500 Internal Server Error`.

## Testing with Postman

1. Open Postman and create a new request.
2. Set the request type (GET, POST, etc.) and enter the URL.
3. Add the request body in JSON format for POST and PUT requests.
4. Send the request and observe the response.
