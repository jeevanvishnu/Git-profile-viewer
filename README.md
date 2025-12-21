# GitHub Profile Viewer

A full-stack web application for exploring GitHub profiles, repositories, and discovering popular repositories by programming language. Built with React, TypeScript, Fastify, and MongoDB.

## ✨ Features

- **🔐 GitHub OAuth Authentication** - Secure login using GitHub accounts
- **👤 Profile Search** - Search and view any GitHub user's profile
- **📊 Repository Management** - View user repositories with sorting options (recent, stars, forks)
- **⭐ Like Profiles** - Save and manage your favorite GitHub profiles
- **🔍 Explore Repositories** - Discover popular repositories by programming language (JavaScript, TypeScript, Python, Java, C++, and more)
- **📱 Responsive Design** - Modern, glassmorphic UI that works on all devices
- **💖 Like Notifications** - See who liked your profile

## 🛠️ Tech Stack

### Frontend

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications
- **React Icons** - Icon library

### Backend

- **Fastify** - Fast web framework
- **TypeScript** - Type safety
- **MongoDB** - Database (via Mongoose)
- **Passport.js** - Authentication middleware
- **GitHub OAuth 2.0** - Authentication strategy
- **Fastify Passport** - Passport integration for Fastify
- **Secure Sessions** - Session management

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **Bun** (or npm/yarn) - Package manager
- **MongoDB** - Database server (local or cloud instance)
- **GitHub Account** - For OAuth setup

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd GitHub-App
```

### 2. Backend Setup

```bash
cd backend
bun install
```

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000

# MongoDB Configuration
MONGODB_URL=mongodb://localhost:27017/gitprofile

# GitHub OAuth Configuration
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# GitHub API Token (for fetching user data)
GITHUB_API_KEY=your_github_personal_access_token

# Session & Cookie Secrets (generate random strings)
SECRET_COOKIE=your_secret_cookie_string
SECRET_SESSION=your_base64_encoded_session_secret

# Client URL
CLIENT_BASE_URL=http://localhost:3000
```

**To get GitHub OAuth credentials:**

1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Create a new OAuth App
3. Set Authorization callback URL to: `http://localhost:5000/api/v1/auth/github/callback`
4. Copy the Client ID and Client Secret

**To get GitHub API Token:**

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate a new token with `public_repo` and `read:user` scopes
3. Copy the token

**To generate session secret:**

```bash
# Generate a random base64 string (32 bytes)
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 3. Frontend Setup

```bash
cd ../frontend
bun install
```

### 4. Start the Application

**Terminal 1 - Backend:**

```bash
cd backend
bun run start
```

The backend server will start on `http://localhost:5000`

**Terminal 2 - Frontend:**

```bash
cd frontend
bun run dev
```

The frontend will start on `http://localhost:3000`

## 📁 Project Structure

```
GitHub-App/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts              # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── explore.controller.ts
│   │   │   └── user.controller.ts
│   │   ├── middleware/
│   │   │   └── ensureAuthenticated.ts
│   │   ├── model/
│   │   │   └── user.model.ts      # User schema
│   │   ├── passport/
│   │   │   └── github.auth.ts     # GitHub OAuth strategy
│   │   ├── routes/
│   │   │   ├── auth.route.ts      # Authentication routes
│   │   │   ├── explore.route.ts   # Explore routes
│   │   │   └── user.route.ts      # User routes
│   │   └── server.ts              # Server entry point
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LikeProfile.tsx
│   │   │   ├── Logout.tsx
│   │   │   ├── ProfileInfo.tsx
│   │   │   ├── Repo.tsx
│   │   │   ├── Repos.tsx
│   │   │   ├── Search.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── SortRepo.tsx
│   │   │   └── Spinner.tsx
│   │   ├── context/
│   │   │   └── AuthContex.tsx     # Authentication context
│   │   ├── pages/
│   │   │   ├── ExplorePage.tsx
│   │   │   ├── HomePage.tsx
│   │   │   ├── LikePage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   └── SignupPage.tsx
│   │   ├── utils/
│   │   │   ├── constense.tsx
│   │   │   └── function.tsx
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
```

## 🔌 API Endpoints

### Authentication

- `GET /api/v1/auth/github` - Initiate GitHub OAuth
- `GET /api/v1/auth/github/callback` - OAuth callback
- `GET /api/v1/auth/check` - Check authentication status
- `GET /api/v1/auth/logout` - Logout user

### User

- `GET /api/v1/user/profile/:username` - Get user profile and repositories
- `POST /api/v1/user/like/:username` - Like a user profile
- `GET /api/v1/user/likes` - Get all users who liked your profile

### Explore

- `GET /api/v1/explore/repos/:language` - Get popular repositories by language

## 🎨 Features in Detail

### Profile Viewing

- View comprehensive GitHub profile information
- Display user statistics (followers, following, repositories, gists)
- Show user bio, location, email, and social links
- View all public repositories with sorting options

### Repository Sorting

- **Recent** - Sort by creation date (newest first)
- **Stars** - Sort by number of stars (most popular first)
- **Forks** - Sort by number of forks (most forked first)

### Explore Page

- Browse popular repositories by programming language
- Supported languages: JavaScript, TypeScript, Python, Java, C++, C#, Go, Swift, HTML, CSS

### Like System

- Like profiles to save them for later
- View who liked your profile
- Track when profiles were liked

## 🧪 Development

### Format Code

```bash
cd backend
bun run format
```

### Build for Production

```bash
cd frontend
bun run build
```

## 🔒 Security Notes

- Never commit `.env` files to version control
- Use strong, random secrets for session and cookie encryption
- Keep GitHub API tokens secure and rotate them regularly
- Use HTTPS in production

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- GitHub API for providing user and repository data
- All the amazing open-source libraries that made this project possible

---

Made with ❤️ using React, TypeScript, and Fastify
