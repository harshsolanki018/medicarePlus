# MediCare Plus 

A full-stack healthcare appointment management system built using React.js, Node.js, Express.js, and MongoDB. MediCare Plus streamlines the appointment booking process by connecting patients with doctors through an intuitive and responsive web application. The platform provides dedicated dashboards for patients and administrators, enabling efficient healthcare management and appointment tracking.

---

## 📖 Overview

MediCare Plus is designed to simplify the interaction between patients and healthcare providers. Patients can register, browse doctor profiles, book appointments, and monitor appointment status, while administrators can manage doctors, patients, and appointment requests through a centralized dashboard.

This project was developed as part of the Bachelor of Computer Applications (BCA) curriculum and demonstrates practical implementation of full-stack web development concepts using the MERN stack. Based on the project documentation, the system supports patient registration, doctor management, appointment scheduling, and appointment status updates.

---

## ✨ Features

### 👤 Patient Module

- User Registration and Authentication
- Secure Login & Logout
- Browse Available Doctors
- View Doctor Details
- Book Appointments Online
- View Appointment Status
- Manage Personal Appointments
- Responsive User Interface

### 🛠️ Admin Module

- Secure Admin Authentication
- Manage Doctors
  - Add Doctor
  - Edit Doctor
  - Delete Doctor
- View Registered Patients
- Manage Appointment Requests
- Update Appointment Status
  - Pending
  - Approved
  - Completed
  - Cancelled
- Dashboard Overview

### 🔒 Security Features

- Password Hashing
- JWT Authentication
- Protected Routes
- Role-Based Access Control
- Input Validation

---

## 🚀 Tech Stack

### Frontend

- React.js
- JavaScript (ES6+)
- HTML5
- CSS3
- React Router
- Axios

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

### Development Tools

- VS Code
- Git
- GitHub
- Postman

---

## 📂 Project Structure

```bash
MediCare-Plus/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   └── App.js
│   │
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
├── screenshots/
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/harshsolanki018/medicareplus.git
cd medicareplus
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm start
```

Frontend runs on:

```text
http://localhost:3000
```

---

## Backend Setup

```bash
cd backend

npm install

npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

## 🔑 Environment Variables

Create a `.env` file inside the backend folder:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

NODE_ENV=development
```

---

## 🗄️ Database Collections

### Users Collection

```javascript
{
  name,
  email,
  password,
  phone,
  age,
  gender
}
```

### Doctors Collection

```javascript
{
  name,
  email,
  phone,
  specialization,
  experience,
  fees,
  timings,
  photo
}
```

### Appointments Collection

```javascript
{
  patientId,
  doctorId,
  appointmentDate,
  appointmentTime,
  reason,
  status
}
```

### Admin Collection

```javascript
{
  name,
  email,
  password,
  role
}
```

---

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description |
|----------|-------------|-------------|
| POST | /api/auth/register | Register User |
| POST | /api/auth/login | Login User |

---

### Doctors

| Method | Endpoint | Description |
|----------|-------------|-------------|
| GET | /api/doctors | Get All Doctors |
| GET | /api/doctors/:id | Get Doctor Details |
| POST | /api/doctors | Add Doctor |
| PUT | /api/doctors/:id | Update Doctor |
| DELETE | /api/doctors/:id | Delete Doctor |

---

### Appointments

| Method | Endpoint | Description |
|----------|-------------|-------------|
| POST | /api/appointments | Book Appointment |
| GET | /api/appointments | Get Appointments |
| PUT | /api/appointments/:id | Update Status |
| DELETE | /api/appointments/:id | Cancel Appointment |

---

## 📋 System Workflow

### Patient Flow

1. Register Account
2. Login
3. Browse Doctors
4. Select Doctor
5. Book Appointment
6. Track Appointment Status
7. Logout

### Admin Flow

1. Login
2. Manage Doctors
3. View Patients
4. Review Appointments
5. Update Appointment Status
6. Logout

---

## 📸 Screenshots

Add screenshots inside the `screenshots` folder and update paths below.

### Home Page

```md
![Home](screenshots/home.png)
```

### Doctors Page

```md
![Doctors](screenshots/doctors.png)
```

### Login Page

```md
![Login](screenshots/login.png)
```

### Book Appointment

```md
![Appointment](screenshots/appointment.png)
```

### Admin Dashboard

```md
![Admin Dashboard](screenshots/admin-dashboard.png)
```

---

## 🎯 Learning Outcomes

This project helped in understanding:

- MERN Stack Development
- REST API Development
- MongoDB Database Design
- Authentication & Authorization
- CRUD Operations
- React State Management
- Component-Based Architecture
- Client-Server Communication
- Full Stack Deployment Workflow

---

## 🔮 Future Enhancements

- Online Video Consultation
- Doctor Self Registration
- Email Notifications
- Medical Report Upload
- Digital Prescriptions
- Payment Gateway Integration
- Real-Time Appointment Updates
- Multi-Language Support
- Advanced Search & Filtering

---

## 👨‍💻 Author

### Harsh Solanki

- GitHub: https://github.com/harshsolanki018
- LinkedIn: https://linkedin.com/in/harshsolanki18

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

---

## 📄 License

This project is developed for educational and learning purposes.
