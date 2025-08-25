# EduPlatform - Student-Teacher Management System

A comprehensive platform for students and teachers to manage notes, assignments, doubts, and announcements with modern authentication and real-time features.

## Features

### For Students
- **Dashboard**: Overview of assignments, notes, doubts, and announcements
- **Notes Management**: Browse, search, and download study materials by subject
- **Assignment Tracking**: View assignments, submit work, and track grades
- **Doubt Resolution**: Ask questions and get help from teachers and peers
- **Announcements**: Stay updated with important notifications
- **Calendar**: Track important dates and deadlines

### For Teachers
- **Teacher Dashboard**: Manage classes, students, and academic content
- **Student Management**: View student profiles, track progress, and performance
- **Assignment Creation**: Create, distribute, and grade assignments
- **Doubt Management**: Answer student questions and provide guidance
- **Announcement System**: Post important updates and notifications
- **Resource Sharing**: Upload and manage study materials

### Technical Features
- **Authentication**: Secure login with Clerk Auth
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Real-time Updates**: Live notifications and updates
- **File Management**: Upload, download, and manage documents
- **Search & Filter**: Advanced search and filtering capabilities
- **Role-based Access**: Different interfaces for students and teachers

## Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **Tailwind CSS** - Styling framework
- **Clerk** - Authentication and user management
- **Radix UI** - Accessible UI components
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Token-based authentication
- **Multer** - File upload handling

## Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB installed and running
- Clerk account for authentication

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/eduplatform.git
   cd eduplatform
   ```

2. **Install client dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Install server dependencies**
   ```bash
   cd ../server
   npm install
   ```

4. **Set up environment variables**

   **Client (.env.local):**
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

   **Server (.env):**
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/student-platform
   JWT_SECRET=your_jwt_secret_here
   NODE_ENV=development
   ```

5. **Set up Clerk Authentication**
   - Create a Clerk account at [clerk.com](https://clerk.com)
   - Create a new application
   - Copy the publishable key and secret key to your environment variables
   - Configure sign-in/sign-up pages in Clerk dashboard

6. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   
   # Or use MongoDB Atlas cloud database
   ```

7. **Start the development servers**

   **Terminal 1 - Start the backend server:**
   ```bash
   cd server
   npm run dev
   ```

   **Terminal 2 - Start the frontend:**
   ```bash
   cd client
   npm run dev
   ```

8. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Project Structure

```
eduplatform/
├── client/                 # Next.js frontend
│   ├── src/
│   │   ├── app/           # App router pages
│   │   ├── components/    # Reusable components
│   │   ├── lib/          # Utility functions
│   │   └── middleware.js  # Clerk middleware
│   ├── public/           # Static assets
│   └── package.json
├── server/                # Express.js backend
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   └── index.js         # Server entry point
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/webhook` - Clerk webhook for user sync
- `GET /api/auth/profile/:clerkId` - Get user profile
- `PUT /api/auth/profile/:clerkId` - Update user profile

### Notes
- `GET /api/notes` - Get all notes
- `GET /api/notes/:id` - Get note by ID
- `POST /api/notes` - Create new note (teachers only)
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

### Assignments
- `GET /api/assignments/student/:clerkId` - Get student assignments
- `GET /api/assignments/teacher/:clerkId` - Get teacher assignments
- `POST /api/assignments` - Create assignment (teachers only)
- `POST /api/assignments/:id/submit` - Submit assignment (students only)
- `PUT /api/assignments/:assignmentId/grade/:submissionId` - Grade assignment

### Doubts
- `GET /api/doubts` - Get all doubts
- `GET /api/doubts/student/:clerkId` - Get student doubts
- `GET /api/doubts/:id` - Get doubt by ID
- `POST /api/doubts` - Create doubt (students only)
- `POST /api/doubts/:id/respond` - Add response to doubt
- `PUT /api/doubts/:id/resolve` - Mark doubt as resolved

### Announcements
- `GET /api/announcements` - Get all announcements
- `GET /api/announcements/user/:clerkId` - Get user-specific announcements
- `POST /api/announcements` - Create announcement (teachers/admins only)
- `PUT /api/announcements/:id/read` - Mark announcement as read
- `PUT /api/announcements/read-all` - Mark all announcements as read

## Deployment

### Frontend (Vercel)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Backend (Railway/Heroku)
1. Create a new project on Railway or Heroku
2. Connect your repository
3. Add environment variables
4. Deploy

### Database (MongoDB Atlas)
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get connection string
4. Update MONGODB_URI in environment variables

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@eduplatform.com or join our Discord community.

## Acknowledgments

- [Clerk](https://clerk.com) for authentication
- [Tailwind CSS](https://tailwindcss.com) for styling
- [Radix UI](https://radix-ui.com) for accessible components
- [Lucide](https://lucide.dev) for icons