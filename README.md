# Habit Tracker App

>This web application assists users in creating, managing, and tracking their daily habits. It utilizes a tech stack comprising Node.js for server-side scripting, Express for HTTP request handling and routing, MongoDB for data storage and management, and EJS for rendering views and templates.

## Technologies Used

1. Node.js
2. Express
3. EJS
4. Mongoose

## Prerequisites

Ensure you have the following installed:

- Mongoose
- Git
- Node.js
- Command Line Interface (CLI)

## Installation

To install the necessary dependencies:

```bash
npm install
## Folder Structure

HABIT TRACKER
├── assets
│   ├── week.js
│   └── css
│       ├── styles.css
│       ├── habit.jpg
│       └── bootstrap.min.css
├── config
│   └── db_config.js
├── controller
│   ├── habitController.js
│   └── UserController.js
├── models
│   ├── habit.model.js
│   └── user.model.js
├── node_modules
├── routes
│   ├── habit.js
│   └── users.js
├── views
│   ├── partials
│   │   └── messages.ejs
│   ├── dashboard.ejs
│   ├── layout.ejs
│   ├── loginPage.ejs
│   ├── registerPage.ejs
│   └── welcomePage.ejs
├── .gitignore
├── app.js
├── package.json
├── package-lock.json
└── README.md