# Lendsqr Admin Console Submission

## Project Overview

This is my submission for the Lendsqr frontend engineering assessment. The project is a React application built with TypeScript and SCSS, closely following the provided Figma design. It demonstrates my approach to frontend architecture, code quality, and responsiveness.

## What This Submission Contains

- **Login Page:** User authentication interface styled to match the Figma design.
- **Dashboard Page:** Overview of key metrics and navigation, fully responsive.
- **User Page:** Displays a paginated list of 500 users fetched from a mock API (`public/users.json`).
- **User Details Page:** Shows detailed information for a selected user, with data stored and retrieved using local storage for persistence.
- **Reusable UI Components:** Custom input fields, buttons, and layouts for consistency and maintainability.
- **Routing:** Protected routes and navigation using React Router.
- **State Management:** React hooks and context for managing user data and authentication state.
- **Unit Tests:** Key components and pages are covered with positive and negative scenario tests using Jest and React Testing Library.
- **Mobile Responsiveness:** All pages adapt to different screen sizes using SCSS and CSS media queries.

## My Approach

- **Design Fidelity:** I prioritized pixel-perfect implementation by referencing the Figma design and using SCSS for custom styling.
- **Code Structure:** The codebase is organized by feature (pages, components, hooks, services) for scalability and clarity.
- **Mock Data:** User data is served from a local JSON file to simulate API responses, ensuring fast development and easy testing.
- **Persistence:** User details are cached in local storage to allow quick retrieval and offline access.
- **Testing:** I wrote unit tests for critical components and flows, focusing on both expected and edge cases.
- **Responsiveness:** I used SCSS mixins and variables to ensure the UI looks great on all devices.
- **Best Practices:** Consistent naming, semantic HTML, and clear commit messages throughout the project.

## Setup Instructions

1. **Clone the repository:**
   ```powershell
   git clone <your-repo-url>
   cd lendsqr-app
   ```
2. **Install dependencies:**
   ```powershell
   npm install
   ```
3. **Start the development server:**
   ```powershell
   npm run dev
   ```
   The app will be available at `http://localhost:5173` (or the port shown in your terminal).
4. **Run tests:**
   ```powershell
   npm run test
   ```

## Additional Notes

- All mock data is located in `public/users.json`.
- SCSS variables and mixins are in `src/styles/variables.scss` and `src/styles/mixins.scss`.
- For any issues or questions, please contact me via GitHub.
