# Task Tracker App

A collaborative task management application inspired by Trello, with boards, cards, and tasks functionality. Built with Next.js, React, and Liveblocks for real-time collaboration.

<!-- Replace with actual screenshot -->

## Features

- **Board Management**
  - Create multiple boards for different projects/subjects
  - Real-time collaboration using Liveblocks
  - Rich text editing with TipTap editor
  ![board page](https://github.com/awesomesocks123/logged/blob/main/pictures/boardpage.png?raw=true)

- **Card System**
  - Organize tasks into cards (Todo, WIP, Done)
  - Drag-and-drop sorting with SortableJS
  - Markdown support for descriptions
  ![column](pictures\column.png)
  ![card creation](pictures\card_creation.png)
  ![edit card](pictures\edit_card.png)

- **Task Tracking**
  - Add tasks with descriptions and due dates
  - Task activity history/log
  - Visual progress tracking (similar to GitHub contributions grid)

- **User Authentication**
  - Secure login via NextAuth
  - MongoDB data persistence

## Technologies Used

- **Frontend**
  - Next.js 15
  - React 19
  - Tailwind CSS
  - TipTap Editor
  - Liveblocks (for real-time collaboration)
  - SortableJS (for drag-and-drop)

- **Backend**
  - Next.js API Routes
  - NextAuth (Authentication)
  - MongoDB (Database)
  - Yjs (CRDT for collaborative editing)

- **Other Libraries**
  - React Datepicker
  - Font Awesome Icons
  - date-fns (date utilities)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB instance
- Liveblocks account (for real-time features)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/task-tracker.git
   cd task-tracker
   ```

2. Install Dependencies:
    ```bash
    npm install
    ```
    
3. Set up environment variables 
  Create a .env.local file based on .env.example and fill in your credentials:

    ```txt
    MONGODB_URI=your_mongodb_connection_string
    NEXTAUTH_SECRET=your_secret_key
    NEXTAUTH_URL=http://localhost:3000
    LIVEBLOCKS_SECRET_KEY=your_liveblocks_secret_key
    ```

4. Run the dev server:
    ```
    npm run dev
    ```
5. Open http://localhost:3000 in your browser.

### Project Structure
    task-tracker/
    ├── components/       # React components
    ├── lib/             # Utility functions
    ├── models/          # MongoDB models
    ├── pages/           # Next.js pages
    │   ├── api/         # API routes
    │   └── ...          # Page components
    ├── public/          # Static files
    ├── styles/          # CSS files
    ├── .env.example     # Environment variables template
    └── package.json     # Project dependencies
