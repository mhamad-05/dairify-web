# 🧪 Dairify – Antibiotic Residue Detection System

![License](https://img.shields.io/badge/license-MIT-green.svg)

**Dairify** is a comprehensive web-based system designed to support the management of a smart machine that detects and neutralizes antibiotic residues in milk. This system streamlines machine operations, result storage, user interaction, and compliance reporting — ideal for farmers, producers, and researchers.

---

## Table of Contents

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

## Features

- ✅ User registration and login with session support
- ✅ User dashboard to manage their machine
- ✅ Submit and view food sample test results
- ✅ Monitor machine status and recent tests
- ✅ Add, update, and delete antibiotics and enzymes
- ✅ Place machine orders via "Buy" view
- ✅ View order details after confirmation
- ✅ Access research data and support pages
- ✅ Clean and styled EJS-based UI with multiple views

---

## Technologies Used

- **Backend**: Node.js, Express.js  
- **Frontend**: EJS templates, HTML5, CSS3  
- **Database**: MySQL  
- **Validation**: Express-validator  
- **Session Management**: express-session  
- **Environment Management**: dotenv  
- **Version Control**: Git + GitHub  

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mhamad-05/dairify-web.git

cd dairify-web

npm install

CREATE DATABASE ards-db;


PORT=4011
DB_HOST=127.0.0.1
DB_USER=root
DB_PASS=root
DB_PORT=3306
DB_NAME=ards-db
NODE_ENV=development


Database Structure
The system uses these core tables:

users – User information

machines – Machine details and status

antibiotics – Antibiotic types

enzymes – Neutralizing enzymes

food_samples – Submitted samples

test_results – Test results for samples

orders – Orders placed for machines

research_data – Structured data for research purposes

API Endpoints
Users
POST /api/user/register – Register a new user

POST /api/user/login – Authenticate and log in

GET /api/user/:id – Get user details

PUT /api/user/:id – Update user info

DELETE /api/user/:id – Delete user

Antibiotics
GET /api/antibiotics – List all antibiotics

POST /api/antibiotics – Add a new antibiotic

PUT /api/antibiotics/:id – Update antibiotic

DELETE /api/antibiotics/:id – Delete antibiotic

Enzymes
GET /api/enzyme – List all enzymes

POST /api/enzyme – Add new enzyme

PUT /api/enzyme/:id – Update enzyme

DELETE /api/enzyme/:id – Delete enzyme

Machines
GET /api/machine – List all machines

GET /api/machine/:id – Get machine status

PUT /api/machine/:id/status – Update status

Food Samples
POST /api/foodsamples – Submit a food sample

GET /api/foodsamples/:id – View a sample

Test Results
GET /api/testResult – List test results

POST /api/testResult – Add new result

GET /api/testResult/:id – Get a result by ID

PUT /api/testResult/:id – Update result

DELETE /api/testResult/:id – Delete result

Orders
POST /api/orders/buy – Place a new order

GET /order/confirmation/:id – View order summary

GET /api/orders/:id – Get order by ID

DELETE /api/orders/:id – Cancel order

Research Data
GET /api/researchdata – Get research data

POST /api/researchdata – Add research entry

DELETE /api/researchdata/:id – Delete entry


npm start
http://localhost:4011

License
This project is licensed under the MIT License. See the LICENSE file for details.

Contact
For questions or feedback, feel free to contact me:
Mohamad Abou Naasse	,Technical Co-Founder	abounaassemohamad@gmail.com


---

✅ Let me know if you'd like a sample `schema.sql` or deployment instructions for a free host like Render or Railway.
