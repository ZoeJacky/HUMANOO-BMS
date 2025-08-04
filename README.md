# 📚 Book Management System (BMS)

A full-stack web app for managing a collection of books, built with **Spring Boot** (Java) and **React + Vite**. It supports full CRUD operations and is styled with **Bootstrap**.

---

## 🔧 Tech Stack

- **Frontend**: React 19, Vite, Bootstrap
- **Backend**: Spring Boot, Java, JPA (Hibernate)
- **Database**: H2 (or MySQL configurable)
- **Testing**: Vitest, React Testing Library, JUnit, Mockito

---

## 🚀 Features

- List, add, update, and delete books
- Asynchronous API handling with loading/error states
- Responsive UI with Bootstrap
- Structured service/controller/repository backend
- Unit tests for both frontend and backend

---

## 📦 How to Run Locally

### Backend

```bash
cd bms-backend
./mvnw spring-boot:run
````

> Runs at: `http://localhost:8080`

### Frontend

```bash
cd bms-frontend
npm install
npm run dev
```

> Runs at: `http://localhost:3000`

---

## ✅ Running Tests

### Backend (JUnit)

```bash
cd bms-backend
./mvnw test
```

### Frontend (Vitest)

```bash
cd bms-frontend
npm test
```

---

## 📌 API Sample

| Method | Endpoint          | Description    |
| ------ | ----------------- |----------------|
| GET    | `/api/books`      | List all books |
| GET    | `/api/books/{id}` | Get book by ID |
| POST   | `/api/books`      | Create a book  |
| PUT    | `/api/books/{id}` | Update a book  |
| DELETE | `/api/books/{id}` | Delete a book  |

---

## 👤 Author

Shuangshuang Li

---

## 📃 License

MIT
