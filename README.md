# Ashpak Shaikh - Developer Portfolio

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://ashpakportfolio.vercel.app)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?logo=next.js)](https://nextjs.org)
[![Database](https://img.shields.io/badge/Database-Neon%20PostgreSQL-006400?logo=postgresql)](https://neon.tech)
[![ORM](https://img.shields.io/badge/ORM-Prisma-2D3748?logo=prisma)](https://prisma.io)

A modern, full-stack developer portfolio with admin dashboard, contact form with email notifications, and image uploads.

## ✨ Features

- 🎨 **Modern UI** - Dark theme with glass-morphism effects, smooth animations, and 3D elements
- 📱 **Fully Responsive** - Works perfectly on all devices
- 📊 **Admin Dashboard** - Manage projects and view contact messages
- 📧 **Email Notifications** - Instant email alerts for new contact form submissions
- 🖼️ **Image Uploads** - Upload project screenshots via Cloudinary
- 🗄️ **Database Backend** - PostgreSQL with Prisma ORM
- 🚀 **Deployed on Vercel** - Free hosting with automatic deployments

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion |
| **Backend** | Next.js API Routes, Prisma ORM |
| **Database** | PostgreSQL (Neon) |
| **Email** | Resend |
| **Image Hosting** | Cloudinary |
| **Deployment** | Vercel |
| **3D Graphics** | Three.js, React Three Fiber |

## 📁 Project Structure

src/
├── app/
│ ├── admin/ # Admin dashboard pages
│ │ ├── login/ # Admin login page
│ │ └── dashboard/ # Main admin dashboard
│ ├── api/ # API routes
│ │ ├── admin/ # Authentication endpoints
│ │ ├── contact/ # Contact form endpoints
│ │ ├── projects/ # CRUD operations for projects
│ │ └── upload/ # Image upload endpoint
│ └── components/ # Reusable React components
├── lib/ # Utility functions
│ ├── prisma.ts # Database connection
│ ├── email.ts # Email utilities
│ └── cloudinary.ts # Image upload utilities
└── types/ # TypeScript type definitions


## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher
- PostgreSQL database (Neon recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ashpak0608/developer-portfolio.git
   cd developer-portfolio

   Install dependencies

npm install

# Database
DATABASE_URL="postgresql://..."

# Admin
ADMIN_PASSWORD="yourStrongPassword123!"

# Email (Resend)
RESEND_API_KEY="re_..."
ADMIN_EMAIL="your-email@gmail.com"
FROM_EMAIL="onboarding@resend.dev"

# Image Upload (Cloudinary)
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

npx prisma db push
npx prisma generate

npm run dev

Open http://localhost:3000

📊 Admin Dashboard
Access the admin dashboard at /admin/login

Login: Use the ADMIN_PASSWORD from your .env file

Messages: View, read, and delete contact form submissions

Projects: Add, edit, and delete projects with image uploads

📧 Email Notifications
When someone submits the contact form:

Admin receives - Detailed email with all form data

User receives - Auto-reply confirmation email

Upload project screenshots via the admin dashboard

Images are stored on Cloudinary (free tier)

Automatic optimization and responsive images

🔧 Available Scripts
Command	Description
npm run dev	Start development server
npm run build	Build for production
npm start	Start production server
npx prisma studio	Open database GUI
npx prisma db push	Update database schema


🌐 Live Demo
Visit ashpakportfolio.vercel.app

📞 Contact
Email: shaikhashpak0608@gmail.com

GitHub: @ashpak0608

LinkedIn: Ashpak Shaikh

📄 License
MIT License - feel free to use this for your own portfolio!

🙏 Acknowledgments
Next.js - React framework

Prisma - Database ORM

Neon - Serverless PostgreSQL

Resend - Email service

Cloudinary - Image hosting

Tailwind CSS - Styling

Framer Motion - Animations

text

---

## ✅ Final Steps

1. **Update your database schema**:
   ```bash
   npx prisma db push
Test locally:

bash
npm run dev
Visit admin dashboard: http://localhost:3000/admin/login

Push to GitHub and deploy to Vercel