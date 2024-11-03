#  Real-Time Task Manager with Notifications - Frontend Client - DCODEBLOCK Frontend Role Submission

This is the frontend client for the **DCODEBLOCK Real-Time Task Manager with Notifications application (Frontend Assignment-2)**, built with React, TypeScript, and Socket.io, providing task creation, status updates, and notifications, all wrapped with a responsive UI/UX Design. This project connects to a backend hosted at https://dcodeblock-taskmgr-serverapi.onrender.com and this frontend client is deployed on Render at https://dcodeblock-taskmgr-client.onrender.com.

Applicant Name & Details- [C P Gautham Krishna](https://www.linkedin.com/in/c-p-gautham-krishna-580450227/)

- **Live Website**: [https://dcodeblock-taskmgr-client.onrender.com](https://dcodeblock-taskmgr-client.onrender.com)
- **Demo Video**: https://youtu.be/_wDtQ-aA4B0
- **Backend Server API Repository**: [https://github.com/gauthking/dcodeblock-taskmgr-serverapi](https://github.com/gauthking/dcodeblock-taskmgr-serverapi)
  
## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Usage](#usage)

## Features

- **Task Management**: Create, view, update, and delete tasks.
- **Real-Time Updates**: Live task updates and notifications using Socket.io.
- **Filter and Sort**: Filter tasks by status and sort by due date or status.

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Real-Time Communication**: Socket.io
- **Backend**: Express JS (Typescript Flavour), MongoDB
## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/gauthking/dcodeblock-taskmgr-client.git
   cd dcodeblock-taskmgr-client

2. **Navigate into the Project Directory:**
   ```bash
   cd dcodeblock-taskmgr-client

3. **Install Dependencies: Ensure you have Node.js and npm installed. Then run:**
   ```bash
   npm install


## Environment Variables
You need to configure the following environment variables in a .env file at the root of your project:
  ```bash
    REACT_APP_API_BASE_URL=https://dcodeblock-taskmgr-serverapi.onrender.com
```

## Running the Application
After setting up environment variables and installing dependencies, you can run the project locally with:
   ```bash
   npm run start
```

## Usage
- Add Task: Enter the task title in the input box and click "Add Task."
- Filter and Sort: Use the dropdown menus to filter by status or sort by due date/status.
- Task Actions: Each task card includes options to change the status or delete the task.
- Notifications: Real-time notifications for task updates appear as alerts.

## Application Screenshots

![image](https://github.com/user-attachments/assets/5af211a7-2078-481d-bbf1-4f460521e395)

![image](https://github.com/user-attachments/assets/e234320b-0c71-4c26-b0af-ae0d88125956)

![image](https://github.com/user-attachments/assets/db917f9f-9a85-4192-be17-37646b0e9423)

![image](https://github.com/user-attachments/assets/c615e980-b779-450f-a576-6b727b1700fa)

![image](https://github.com/user-attachments/assets/6368fb3e-9cb4-43ae-a8a0-c664ed87e494)

![image](https://github.com/user-attachments/assets/efef648f-a99f-4f18-8c26-18fad9c32216)


