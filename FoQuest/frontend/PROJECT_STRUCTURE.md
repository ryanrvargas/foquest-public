# FoQuest Frontend - Project Structure

## 📁 Current File Structure

```
src/
├── app/                           # Next.js App Router
│   ├── page.tsx                   # Home page (redirects if logged in)
│   ├── layout.tsx                 # Root layout with user context
│   ├── login/
│   │   └── page.tsx               # Login page (GROUP'S RESPONSIBILITY)
│   ├── signup/
│   │   └── page.tsx               # Signup page (GROUP'S RESPONSIBILITY)
│   └── dashboard/                 # User-specific pages (YOUR RESPONSIBILITY)
│       ├── page.tsx               # Main dashboard hub
│       ├── calendar/page.tsx      # User calendar
│       ├── tasks/page.tsx         # User tasks
│       ├── profile/page.tsx       # User profile
│       ├── analytics/page.tsx     # User analytics
│       ├── settings/page.tsx      # User settings
│       └── notes/page.tsx         # User notes
├── contexts/
│   └── UserContext.tsx           # User authentication state
└── components/
    └── MockLogin.tsx              # Development testing component
```

## 🔐 Authentication Flow

### **For Non-Logged-In Users:**
- Visit `/` → See home page with mock login
- Use mock login → Automatically redirected to `/dashboard`
- Can access `/login` and `/signup` pages

### **For Logged-In Users:**
- Visit `/` → Automatically redirected to `/dashboard`
- All dashboard pages show personalized content
- Each page displays "Welcome, [username]!"

## 👥 Team Responsibilities

### **Your Group Members:**
- **`/login`** - Build actual login form with backend integration
- **`/signup`** - Build actual signup form with backend integration
- **Backend Integration** - Connect forms to database/API

### **Your Responsibility:**
- **`/`** - Home page logic and user redirection
- **`/dashboard`** - Main user hub with navigation
- **`/dashboard/calendar`** - User-specific calendar functionality
- **`/dashboard/tasks`** - User-specific task management
- **`/dashboard/profile`** - User profile management
- **`/dashboard/analytics`** - User analytics and insights
- **`/dashboard/settings`** - User settings and preferences
- **`/dashboard/notes`** - User notes and thoughts

## 🚀 How to Test

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Test the flow:**
   - Go to `http://localhost:3000`
   - Use the mock login form (enter any username/email)
   - See personalized dashboard with your username
   - Navigate between all user-specific pages
   - Test logout functionality

## 🎯 Key Features

### **✅ What's Already Working:**
- User authentication system with context
- Dynamic routing for user-specific pages
- Personalized content display with username
- Navigation between all pages
- Logout functionality
- Automatic redirects for logged-in users

### **✅ What's Ready for Development:**
- Each dashboard page is a placeholder ready for your features
- User data is available throughout the application
- Clean, organized structure for team collaboration
- Isolated development areas (no interference between team members)

## 📋 Next Steps

### **For Your Group:**
- Replace simple login/signup pages with actual forms
- Integrate with backend authentication
- Connect to database for user storage

### **For You:**
- Build out calendar functionality
- Implement task management features
- Create user profile management
- Add analytics and insights
- Develop settings and preferences
- Build notes system

## 🔧 Technical Details

- **Framework:** Next.js 15 with App Router
- **Styling:** Tailwind CSS v4
- **State Management:** React Context for user authentication
- **TypeScript:** Fully typed with strict configuration
- **Routing:** File-based routing with dynamic user pages

## 💡 Benefits of This Structure

- **Team Independence:** Each team member can work without affecting others
- **User Experience:** Seamless authentication flow
- **Scalability:** Easy to add more user-specific features
- **Maintainability:** Clean separation of concerns
- **Development:** Mock authentication for testing without backend
