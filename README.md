# CodeVector Product Browser

A product browsing application built with **Node.js, Express, MongoDB, Mongoose, and React**.

The application supports:

* Browsing 200,000+ products
* Category filtering
* Fast cursor-based pagination
* Stable browsing experience while data changes
* React frontend with Axios

---

## Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Frontend

* React
* Vite
* Axios


---

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/kN1ghtOwlx/Codevector-internship-assignment.git
cd Codevector-internship-assignment
```

---

## Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGODB_URI=<your-mongodb-connection-string>
```

Generate sample data:

```bash
npm run seed
```

Start the backend server:

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:3001
```

---

## Frontend Setup

Open a new terminal and navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:3001
```

Start the frontend:

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

## API Endpoint

### Get Products

```http
GET /api/products
```

Query Parameters:

| Parameter | Description                        |
| --------- | ---------------------------------- |
| limit     | Number of products per page        |
| category  | Filter products by category        |
| cursor    | Cursor returned from previous page |

Example:

```http
GET /api/products?limit=20&category=electronics
```

---

## Pagination Strategy

The application uses **cursor-based pagination** instead of offset-based pagination.

Benefits:

* Fast on large datasets
* Avoids expensive skips
* Prevents duplicate records while browsing
* Provides a stable browsing experience when new products are added

---

## Future Improvements

* Automated tests
* Docker support
* Infinite scrolling
* Search functionality
* CI/CD pipeline

