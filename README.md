# Numbers Management Dashboard

## Overview

The Numbers Management Dashboard is a simple and intuitive web application that helps companies manage their telephone numbers. Users can add, edit, delete, and filter numbers to keep their database clean and organized.

---

## Features

- **Add Numbers**: Single or multiple numbers can be onboarded.
- **Edit and Delete**: Update or remove existing numbers.
- **Search and Filter**: Find numbers quickly by searching or applying filters.
- **Responsive Design**: Works seamlessly across different devices.

---

## Tech Stack

### Frontend
- **React**: For building the user interface.
- **Material-UI**: For consistent and beautiful styling.
- **Redux Toolkit**: For state management.
- **Vite**: For faster development builds.

### Backend
- **NestJS**: A scalable Node.js framework.
- **In-memory Database**: Mock database for this task.
- **Validation**: Built-in NestJS pipes for input validation.

---

## Project Structure

```
numbers-management-app/
├── frontend/                         # Frontend of the application
│   ├── public/                       # Static files (e.g., index.html)
│   ├── src/                          # Source code for the frontend
│   │   ├── components/               # Globally reusable UI components
│   │   ├── pages/                    # High-level application pages
│   │   ├── features/                 # Feature-specific logic and components
│   │   │   ├── numbers/              # Numbers management feature
│   │   │   │   ├── components/       # Reusable components for numbers feature
│   │   │   │   ├── NumbersPage.tsx   # Page for viewing and managing numbers
│   │   │   │   ├── RegisterPage.tsx  # Page for adding new numbers
│   │   │   │   ├── api.ts            # RTK Query slice for numbers API
│   │   │   │   └── types.ts          # TypeScript types for numbers
│   │   ├── assets/                   # Images, icons, and other assets
│   │   ├── routes/                   # Application routes
│   │   ├── theme/                    # Material-UI theme customization
│   │   ├── test/                     # Tests for frontend functionality
│   │   ├── main.tsx                  # Entry point for the frontend
│   │   └── App.tsx                   # Root component of the application
│   ├── index.html                    # The main HTML file for the frontend
│   ├── package.json                  # Frontend dependencies and scripts
│   ├── tsconfig.json                 # TypeScript configuration for the frontend
│   ├── vitest.setup                  # Configuration for Vitest testing framework
│   └── vitest.config.ts              # Vite-specific configurations
├── backend/                          # Backend of the application
│   ├── src/                          # Source code for the backend
│   │   ├── mock/                     # Mocked database for testing
│   │   │   └── numbers.mock.ts       # Mock data for numbers
│   │   ├── numbers/                  # Numbers feature module
│   │   │   ├── dtos/                 # Data Transfer Objects for validation
│   │   │   ├── types/                # Type definitions for the numbers feature
│   │   │   ├── numbers.controller.ts # Handles incoming API requests
│   │   │   ├── numbers.module.ts     # Module declaration for numbers feature
│   │   │   ├── numbers.service.ts    # Business logic for numbers management
│   │   ├── app.module.ts             # Root module for the backend
│   │   └── main.ts                   # Entry point for the backend
│   ├── package.json                  # Backend dependencies and scripts
│   └── tsconfig.json                 # TypeScript configuration for the backend
└── README.md                         # Documentation for the project

```

---

## How to Set Up

### Prerequisites
- Install [Node.js](https://nodejs.org/) (version 16 or later)
- Have Git installed

### Steps

1. **Clone the Repository**
   ```bash
   git clone <repository_url>
   cd numbers-management-app
   ```

2. **Install Dependencies**
   **Frontend:**
   ```bash
   cd frontend
   npm install
   ```

   **Backend:**
   ```bash
   cd ../backend
   npm install
   ```

3. **Run the Application**
   ```bash
   npm run start
   ```

4. **Open in Browser**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:3000](http://localhost:3000)

---

## Usage Instructions

### Homepage
- Provides an introduction and navigation options.

### Register Page
- Add a single number or multiple numbers (comma-separated).

### Numbers Management Page
- View, search, filter, edit, and delete numbers.
- Use the search bar for quick lookups.
- Apply filters using the **Filter** button.

---

## How It Works

### Search and Filter Logic
The application dynamically filters and searches through numbers based on user input. Here’s a snippet from the filtering logic:

```tsx
useEffect(() => {
  if (numbers) {
    setFilteredNumbers(
      numbers.filter((num) => {
        const matchesSearch = num.number
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesPrefix = !filters.prefix || num.prefix === filters.prefix;
        const matchesCountry = !filters.country || num.country === filters.country;
        const matchesCompany = !filters.company || num.company === filters.company;

        return matchesSearch && matchesPrefix && matchesCountry && matchesCompany;
      })
    );

    setHasActiveFilters(
      !!filters.prefix || !!filters.country || !!filters.company
    );
  }
}, [numbers, searchTerm, filters]);
```

---

## Contributing

- Fork the repository and make your changes.
- Submit a pull request with detailed comments on the changes made.

---

## License
This project is licensed under the MIT License. Feel free to use and modify it as you wish.

---

### Happy Coding! 🚀

