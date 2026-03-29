# Plant Shop - Fullstack Web Application

A modern plant shop website built with React, Node.js, and SQLite.

## Features
- **User Side**: Browse plants, search by name, and view detailed information.
- **Admin Side**: Manage inventory (Add, Edit, Delete plants) with image upload support.
- **Responsive Design**: Premium look and feel, fully responsive for all devices.
- **Search**: Instant filtering of plants on the home page.

## Tech Stack
- **Frontend**: React (Vite), Axios, React Router.
- **Backend**: Node.js, Express.js.
- **Database**: SQLite.
- **Image Upload**: Multer.

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

1. **Clone the repository** (if applicable) or navigate to the project folder.

2. **Setup Server**:
   ```bash
   cd server
   npm install
   ```

3. **Setup Client**:
   ```bash
   cd ../client
   npm install
   ```

### Running the Project

1. **Start the Backend Server**:
   ```bash
   cd server
   node server.js
   ```
   The server will run on `http://localhost:5000`.

2. **Start the Frontend Development Server**:
   ```bash
   cd client
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

## Project Structure
- `server/`: Express API, SQLite database, and uploaded images.
- `client/`: React application (Vite).
- `client/src/api/`: Axios API service.
- `client/src/pages/`: Application pages (Home, Detail, Admin).
- `client/src/components/`: Reusable UI components.
