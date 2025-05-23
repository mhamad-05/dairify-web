# 🧪 Dairify – Antibiotic Residue Detection System

![License](https://img.shields.io/badge/license-MIT-green.svg)

**Dairify** is a full-stack web application designed to support a smart machine that detects and neutralizes antibiotic residues in milk. Built for farms, labs, and food safety institutions, the platform includes dashboards, testing, reporting, and ordering functionality.

---

## 📚 Table of Contents

1. [Features](#features)  
2. [Technologies Used](#technologies-used)  
3. [Installation](#installation)  
4. [Configuration](#configuration)  
5. [Database Structure](#database-structure)  
6. [API Endpoints](#api-endpoints)  
7. [Usage](#usage)  
8. [Contributing](#contributing)  
9. [License](#license)  
10. [Contact](#contact)

---

## 🌟 Features

- 🧪 Register and log in to monitor your machine
- 📊 Dashboard showing real-time machine status
- 💉 Add antibiotics and enzymes
- 🔬 Submit food samples and view test results
- 🧾 Buy a machine and view orders
- 🧠 Access research data
- 📞 Support, About Us, and feature descriptions

---

## 🧰 Technologies Used

- **Backend**: Node.js, Express.js  
- **Frontend**: EJS, HTML, CSS  
- **Database**: MySQL  
- **Session Management**: express-session  
- **API Testing**: Postman  
- **Environment**: dotenv  

---

## ⚙️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mhamad-05/dairify-web.git
2. Navigate to the project folder:
   ```bash
   cd dairify-web 
3. Install dependencies:
   ```bash
   npm install
4. Set up the database:
Import the SQL file provided in the database folder.
 Update the database configuration in .env.

 ---
 ## 🛠️ Configiration
 Create a .env file in the root directory and add the following environment variables:
PORT=4011
DB_HOST=127.0.0.1
DB_USER=root
DB_PASS=root
DB_PORT=3306
DB_NAME=ards-db
NODE_ENV=development

---
## 📡  API Endpoints
🔐 Users
- POST /api/user/register

- POST /api/user/login

- GET /api/user/:id

- PUT /api/user/:id

- DELETE /api/user/:id

💊 Antibiotics
- GET /api/antibiotics

- POST /api/antibiotics

- PUT /api/antibiotics/:id

- DELETE /api/antibiotics/:id

🧬 Enzymes
- GET /api/enzyme

- POST /api/enzyme

- PUT /api/enzyme/:id

- DELETE /api/enzyme/:id

🧫 Food Samples & Test Results
- POST /api/foodsamples

- GET /api/foodsamples/:id

- GET /api/testResult

- POST /api/testResult

- GET /api/testResult/:id

- PUT /api/testResult/:id

- DELETE /api/testResult/:

🧾 Orders
- POST /api/orders/buy

- GET /order/confirmation/:id

- GET /api/orders/:id

- DELETE /api/orders/:id

📊 Research Data
- GET /api/researchdata

- POST /api/researchdata

- DELETE /api/researchdata/:id

---
## 🚀 Usage
1. Start the application:
   ```bash
   npm start
2. Go To:
   ```aurdino
   http://localhost:4011
3. Register → Log in → Use the dashboard → Manage tests, orders, and research.

---

### 🤝 Contributing
Contributions are welcome!

1. Fork the repo

2. Create a new branch

3. Commit your changes

4. Push to the branch

5. Open a pull request

---
### 📄 License
Licensed under the MIT License.
---
### 📬 Contact
For questions or feedback, feel free to reach out:

- Author: Mohamad Abou Naasse
- GitHub: mhamad-05
- Email: mohamad.abounaasse@std.balamand.edu.lb