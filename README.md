# Inventory Management System (Vue.js Frontend)

This frontend application is built using Vue.js 3 to manage product inventory, track stock quantity, and view business summaries through an interactive dashboard.

## Key Features
- User Authentication: Secure login and register system to control access.
- Product Management: Full CRUD (Create, Read, Update, Delete) functionality to manage products.
- Interactive Dashboard: Displays a summary of inventory data (total products, total stock, low stock items) with engaging counting animations.
- Dynamic Product View: Search, filtering, and pagination to facilitate product data navigation.
- Data Export: A feature to export product data to a CSV format.
- Responsive User Interface: A modern and intuitive design that is user-friendly.

## Technology Stack
- Vue.js 3: A progressive framework for building user interfaces.
- Vite: A fast build tool for a smooth development experience.
- Pinia: A lightweight and intuitive state management solution.
- Vue Router: A routing system for navigating between pages.
- Axios: An HTTP client to communicate with the backend API.
- Vue Toastification: A sleek pop-up notification system for user feedback.
- Heroicons: A collection of easy-to-use SVG icons.
- VueUse: A set of powerful Vue Composition utilities, used here for animations.

## System Requirements
Make sure you have the latest versions of the following installed:
- Node.js
- npm or Yarn

## Installation and Setup
Follow the steps below to run the project locally.

### Clone the repository:
```bash
git clone https://github.com/firriyalbinyahya/manajemen_gudang_fe.git
cd manajemen_gudang_fe
```

### Install dependencies:
```bash
npm install
# or
# yarn install
```
### Environment Variable Configuration:
Create a .env file in the project's root directory. This file should contain your backend API URL.
```bash
VITE_API_BASE_URL=http://localhost:8080/
```
(Replace http://localhost:8080/ with your actual backend API URL.)

### Run the application:
```bash
npm run dev
# or
# yarn dev
```

## Project Structure
- src/views/: Main page components (e.g., LoginPage.vue, ProductPage.vue).
- src/components/: Reusable UI components (e.g., ProductFormModal.vue).
- src/stores/: Pinia modules for state management.
- src/router/: Vue Router configuration.
- src/api/: Axios settings.

## Backend Dependency
This application requires a backend API to function. Please ensure you have the backend project installed and running separately. You can refer to the relevant backend repository for setup instructions.

