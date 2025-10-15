# Employee Management System (EMS)

A comprehensive Employee Management System designed to streamline HR processes and improve workforce management. This application provides distinct dashboard views and functionalities for both Admins and Employees, covering everything from attendance and leave management to payroll and task assignment.

---

## ✨ Key Features

### 👨‍💼 Admin Panel
* **Dashboard Overview:** Get a quick overview of essential stats like total employees, pending leave requests, and total salary expenditure.
* **Employee Management:** Seamlessly add, view, and manage all employee details.
* **Attendance Tracking:** Monitor employee attendance records.
* **Leave Management:** Approve or reject leave requests submitted by employees.
* **Payroll:** Manage and process employee salaries.
* **Task Assignment:** Add new tasks and assign them to employees with priority levels.
* **Secure Authentication:** Secure login and registration system.

### 👷 Employee Panel
* **Personal Dashboard:** View daily attendance, including check-in, break, check-out times, and total working hours.
* **Task Management:** View tasks assigned by the admin.
* **Leave Requests:** Submit leave requests and view their status.
* **Payroll Access:** View personal payroll information.
* **Profile Management:** Manage personal profile details.

---

## 📸 Screenshots

### **Authentication**
Create your account or log in as an Admin or Employee.

*Create Account - Sign Up*
![Create Account Page](/frontend/image/Signup_page.png)

*Welcome Back - Login*
![Login Page](/frontend/image/Login_page.png)


### **Admin Dashboard**
The central hub for admins to manage the entire workforce.

*Admin Dashboard View*
![Admin Dashboard](/frontend/image/admin_dashboard.png)

### **Employee Dashboard**
A personalized dashboard for employees to track their daily activities.

*Employee Dashboard View*
![Employee Dashboard](/frontend/image/user_dashboard.png)

---

## 🛠️ Tech Stack

* **Frontend:** React.js
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Styling:** CSS / Material-UI (or other relevant CSS framework)

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### **Prerequisites**
* Node.js (v14 or later)
* npm
* MongoDB (MongoDB Atlas)

### **Installation**

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/yasinvahora56/EMS.git
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd EMS
    ```
3.  **Install server dependencies:**
    ```sh
    # Navigate to server directory
    cd server
    npm install
    ```
4.  **Install frontend dependencies:**
    ```sh
    # Navigate to frontend directory from the root
    cd ../frontend
    npm install
    ```
5.  **Set up environment variables:**
    Create a `.env` file in the `server` directory and add the following variables. Replace the placeholder values with your actual data.
    ```
    MONGO_URI=<your_mongodb_connection_string>
    JWT_SECRET=<your_super_secret_key_for_jwt>
    ```

6.  **Run the application:**
    * **Start the backend server** (from the `server` directory):
        ```sh
        npm run dev
        npm start
        ```
    * **Start the frontend frontend** (from the `frontend` directory in a new terminal):
        ```sh
        npm run dev
        ```

The application should now be running, with the frontend accessible at `http://localhost:8080`.

---

## ⚙️ Usage

You can use the following default credentials for testing the application onine:

* **Admin Login:**
    * **Email:** `admin@gmail.com`
    * **Password:** `123456`
* **Employee Login:**
    * **Email:** `employee@gmail.com`
    * **Password:** `123456`
