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
├── frontend/
│   ├── public/               # Static files (e.g., index.html)
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── features/         # Feature-specific components and logic
│   │   ├── pages/            # Application pages
│   │   ├── api/              # RTK Query API services
│   │   ├── assets/           # Assets for the app
│   │   ├── routes/           # Application routes
│   │   ├── theme/            # Material-UI theme customization
│   │   ├── test/             # Tests
│   │   ├─── main.tsx          # Entry point for the frontend
│   │   └── App.tsx           # Serves as the root component of the application
│   ├── package.json          # Frontend dependencies
│   ├── tsconfig.json         # Frontend dependencies
│   ├── package.json          # Frontend dependencies
│   ├── vitest.setup         # Frontend dependencies
│   └── vitest.config.ts      # Vite configuration
├── backend/
│   ├── src/
│   │   ├── mock/             # Mock data for testing
│   │   │   └── numbers.mock.ts
│   │   ├── numbers/          # Numbers feature module
│   │   │   ├── dtos/         # Data Transfer Objects
│   │   │   ├── types/        # Type definitions
│   │   │   ├── numbers.controller.ts # Handles API requests for numbers
│   │   │   ├── numbers.module.ts     # Module definition for numbers
│   │   │   ├── numbers.service.ts    # Business logic for numbers
│   │   ├── app.module.ts             # NestJS main application module
│   │   └── main.ts                   # Entry point for the backend
│   ├── test/                         # Tests for backend functionality
│   │   ├── test.test.js              # Example backend test
│   │   └── test.test.tsx             # Example TypeScript test
│   ├── package.json                  # Backend dependencies
│   └── tsconfig.json                 # TypeScript configuration
└── README.md                         # Documentation
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
   **Backend:**
   ```bash
   npm run start
   ```

   **Frontend:**
   ```bash
   cd ../frontend
   npm run dev
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

