# 📚 EduStack - Online Learning Platform

## 🚀 Project Overview

EduStack is a modern online learning platform built using React and Appwrite.  
It allows users to explore courses, enroll in them, and manage their learning journey with a smooth and responsive user experience.
The platform includes authentication, course management, and role-based access (admin, instructor, student), making it a scalable and real-world ready application.

---

## 🎯 Project Objective

The main goal of EduStack is to:
- Provide a seamless online learning experience
- Implement secure authentication and user management
- Practice real-world full-stack development using Appwrite
- Avoid prop drilling using global state management

---

## 🛠️ Tech Stack

### Frontend:

- ⚛️ React.js
- 🟦 TypeScript
- 🎨 Tailwind CSS
- 🧩 Material UI

### State Management:

- 🔄 Redux
- ⚡ Redux Toolkit

### Backend (BaaS):

- 🔥 Appwrite
  - Authentication
  - Database
  - Storage

---

## ✨ Features

- 🔐 User Authentication (Login / Register)
- 👨‍🎓 Role-based access (Admin / Instructor / Student)

### 📚 Course Features
- 📖 Browse and explore courses
- 🛒 Enroll in courses
- 🧑‍🏫 Instructor course management (create, update, delete)
- 📊 Admin course monitoring

### 📝 Blog Features
- ✍️ Create and manage blogs
- 🧑‍🏫 Instructor blog management (only their own content)
- 🛠️ Admin blog control and moderation

### ❤️ Wishlist
- 💖 Add/remove courses to wishlist
- 📌 Save courses for later

### 👥 User Management
- 🛠️ Admin can manage all users
- ✅ Approve or reject instructor requests
- 🔄 Role handling and access control

### 📦 Storage & Backend
- 📁 File upload using Appwrite Storage
- 🔥 Backend powered by Appwrite (Auth, DB, Storage)

### ⚡ Performance & State
- 🔄 Global state management using Redux Toolkit
- 🚫 Avoid prop drilling
- ⚡ Optimized rendering

### 🎨 UI/UX
- 🎨 Responsive design with Tailwind CSS
- 🧩 Component-based UI with Material UI


## 📂 Folder Structure

``` bash

├── 📁 public/
│   └── 🖼️ vite.svg
├── 📁 src/
│   ├── 📁 assets/
│   │   ├── 🖼️ Frame 431.png
│   │   ├── 🖼️ Frame 432.png
│   │   ├── 🖼️ Frame 433.png
│   │   ├── 🖼️ Frame 434.png
│   │   ├── 🖼️ Frame 449 (1).png
│   │   ├── 🖼️ Frame 449.png
│   │   ├── 🖼️ Frame 501 (1).png
│   │   ├── 🖼️ Frame 539.png
│   │   ├── 🖼️ Frame 543 (1).png
│   │   ├── 🖼️ Frame 543 (10).png
│   │   ├── 🖼️ Frame 543 (11).png
│   │   ├── 🖼️ Frame 543 (2).png
│   │   ├── 🖼️ Frame 543 (3).png
│   │   ├── 🖼️ Frame 543 (4).png
│   │   ├── 🖼️ Frame 543 (5).png
│   │   ├── 🖼️ Frame 543 (6).png
│   │   ├── 🖼️ Frame 543 (7).png
│   │   ├── 🖼️ Frame 543 (8).png
│   │   ├── 🖼️ Frame 543 (9).png
│   │   ├── 🖼️ Frame 543.png
│   │   ├── 🖼️ Frame 6 (1).png
│   │   ├── 🖼️ Frame 6 (2).png
│   │   ├── 🖼️ Frame 6 (3).png
│   │   ├── 🖼️ Frame 6 (4).png
│   │   ├── 🖼️ Frame 6 (5).png
│   │   ├── 🖼️ Frame 6.png
│   │   ├── 🖼️ Instructor.png
│   │   ├── 🖼️ image (1) 1.png
│   │   ├── 🖼️ image 1.png
│   │   └── 🖼️ react.svg
│   ├── 📁 components/
│   │   ├── 📁 blog/
│   │   │   ├── 📄 BlogDialogForm.tsx
│   │   │   ├── 📄 BlogPagination.tsx
│   │   │   └── 📄 BlogTable.tsx
│   │   ├── 📁 course/
│   │   │   ├── 📄 CourseDialogForm.tsx
│   │   │   ├── 📄 CoursePagination.tsx
│   │   │   └── 📄 CourseTableData.tsx
│   │   ├── 📄 DynamicInput.tsx
│   │   ├── 📄 FormDialog.tsx
│   │   ├── 📄 ProtectedRoutes.tsx
│   │   ├── 📄 ScrollToTop.tsx
│   │   └── 📄 Slider.tsx
│   ├── 📁 layout/
│   │   ├── 📁 adminLayout/
│   │   │   ├── 📄 AdminWrapper.tsx
│   │   │   ├── 📄 Navbar.tsx
│   │   │   └── 📄 Sidebar.tsx
│   │   └── 📁 userLayout/
│   │       ├── 📄 Footer.tsx
│   │       ├── 📄 Navbar.tsx
│   │       └── 📄 UserWrapper.tsx
│   ├── 📁 lib/
│   │   └── 📄 appwrite.config.ts
│   ├── 📁 pages/
│   │   ├── 📁 admin/
│   │   │   ├── 📄 AdminBlog.tsx
│   │   │   ├── 📄 AdminCategory.tsx
│   │   │   ├── 📄 AdminCourses.tsx
│   │   │   ├── 📄 AdminUser.tsx
│   │   │   ├── 📄 Dashboard.tsx
│   │   │   └── 📄 InstructorRequest.tsx
│   │   ├── 📁 instructor/
│   │   │   ├── 📄 InstructorBlog.tsx
│   │   │   ├── 📄 InstructorCourse.tsx
│   │   │   └── 📄 InstructorDashboard.tsx
│   │   └── 📁 user/
│   │       ├── 📄 About.tsx
│   │       ├── 📄 Blog.tsx
│   │       ├── 📄 Cart.tsx
│   │       ├── 📄 Contact.tsx
│   │       ├── 📄 Courses.tsx
│   │       ├── 📄 Home.tsx
│   │       ├── 📄 InstructorForm.tsx
│   │       ├── 📄 Mycourse.tsx
│   │       ├── 📄 SingleCourse.tsx
│   │       └── 📄 UserInstructor.tsx
│   ├── 📁 routes/
│   │   └── 📄 Routes.tsx
│   ├── 📁 services/
│   │   ├── 📁 config/
│   │   │   ├── 📄 login.config.ts
│   │   │   └── 📄 signup.config.ts
│   │   ├── 📁 helper/
│   │   │   ├── 📁 provider/
│   │   │   │   └── 📄 ReduxProvider.tsx
│   │   │   └── 📄 redux.ts
│   │   ├── 📁 json/
│   │   │   ├── 📁 inputsData/
│   │   │   │   ├── 📄 blog.input.ts
│   │   │   │   ├── 📄 course.input.ts
│   │   │   │   ├── 📄 instructor.input.ts
│   │   │   │   ├── 📄 login.input.ts
│   │   │   │   └── 📄 signup.input.ts
│   │   │   └── 📁 lottie/
│   │   │       ├── ⚙️ Loading animation.json
│   │   │       └── ⚙️ Not Found.json
│   │   └── 📁 validation/
│   │       ├── 📄 blog.validation.ts
│   │       ├── 📄 category.validation.ts
│   │       ├── 📄 contact.validation.ts
│   │       ├── 📄 course.validation.ts
│   │       ├── 📄 login.validation.ts
│   │       └── 📄 signup.validation.ts
│   ├── 📁 stores/
│   │   ├── 📁 slices/
│   │   │   ├── 📄 auth.slice.ts
│   │   │   ├── 📄 blog.slice.ts
│   │   │   ├── 📄 category.slice.ts
│   │   │   ├── 📄 course.slice.ts
│   │   │   ├── 📄 enrollment.slice.ts
│   │   │   ├── 📄 instructor.slice.ts
│   │   │   ├── 📄 user.slice.ts
│   │   │   └── 📄 wishlist.slice.ts
│   │   └── 📄 store.ts
│   ├── 📁 types/
│   │   └── 📄 swiper.d.ts
│   ├── 📁 typescript/
│   │   ├── 📁 interface/
│   │   │   ├── 📄 auth.interface.ts
│   │   │   ├── 📄 blog.interface.ts
│   │   │   ├── 📄 category.interface.ts
│   │   │   ├── 📄 course.interface.ts
│   │   │   ├── 📄 enrollment.interface.ts
│   │   │   ├── 📄 form.interface.ts
│   │   │   ├── 📄 instructor.interface.ts
│   │   │   └── 📄 wishlist.interface.ts
│   │   └── 📁 type/
│   │       ├── 📄 auth.type.ts
│   │       ├── 📄 blog.type.ts
│   │       ├── 📄 category.type.ts
│   │       ├── 📄 contact.type.ts
│   │       ├── 📄 course.type.ts
│   │       ├── 📄 enrollment.type.ts
│   │       ├── 📄 form.type.ts
│   │       ├── 📄 input.type.ts
│   │       ├── 📄 instructor.type.ts
│   │       ├── 📄 redux.type.ts
│   │       ├── 📄 user.type.ts
│   │       └── 📄 wishlist.type.ts
│   ├── 🎨 App.css
│   ├── 📄 App.tsx
│   ├── 📄 global.d.ts
│   ├── 🎨 index.css
│   └── 📄 main.tsx
├── ⚙️ .gitignore
├── 📝 README.md
├── 📄 eslint.config.js
├── 🌐 index.html
├── ⚙️ package-lock.json
├── ⚙️ package.json
├── 📄 postcss.config.js
├── 📄 tailwind.config.js
├── ⚙️ tsconfig.app.json
├── ⚙️ tsconfig.json
├── ⚙️ tsconfig.node.json
├── ⚙️ vercel.json
└── 📄 vite.config.ts
```
