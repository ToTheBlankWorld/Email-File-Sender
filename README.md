# Email Sender - Production Ready

A secure, elegant email sending application built with **Next.js 15**, **React 18**, and **TypeScript**. Features license verification gate, beautiful dark theme glassmorphism UI, and file attachments up to 25MB.

## 🚀 Features

- ✅ **Secure Email Sending** - Uses Gmail SMTP with environment variable credentials
- ✅ **License Verification** - Gate access with license key stored in `.env`
- ✅ **File Attachments** - Support for files up to 25MB
- ✅ **Dark Theme** - Beautiful dark theme with glassmorphism effects
- ✅ **Logout Functionality** - Clear session and return to license verification
- ✅ **Glassmorphism UI** - Modern, animated interface with Tailwind CSS
- ✅ **Responsive Design** - Works perfectly on all devices
- ✅ **Production Ready** - Type-safe, optimized, and verified for Vercel deployment

---

## 📋 System Architecture

### Tech Stack

```
Frontend:
- Next.js 15.5.12 (App Router)
- React 18.3.0
- TypeScript 5.3
- Tailwind CSS 4.0
- Motion (Animations)

Backend:
- Next.js API Routes (Serverless)
- Nodemailer (Email service)
- Node.js Runtime

Infrastructure:
- Vercel (Deployment)
- Environment Variables (Secrets)
```

### Application Flow

```
┌─────────────────────────────────────────────────┐
│  User Visits Application                        │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
        ┌────────────────────────┐
        │ License Gate Middleware│
        │ (Checks localStorage)  │
        └────────────────────────┘
                     │
          ┌──────────┴──────────┐
          │                     │
    License Valid?        License Invalid?
          │                     │
          ▼                     ▼
    ┌─────────────┐      ┌──────────────────┐
    │ Email Sender│      │ License Verify   │
    │ Form Page   │      │ Page             │
    └─────────────┘      └────────┬─────────┘
          │                       │
          │                    (User enters
          │                    license: "kuro")
          │                       │
          │                       ▼
          │                ┌──────────────────┐
          │                │ /api/verify-     │
          │                │ license (POST)   │
          │                │ Validates vs env │
          │                └────────┬─────────┘
          │                         │
          │              ┌──────────┴──────────┐
          │              │                     │
          │         Valid?             Invalid?
          │              │                     │
          │              ▼                     ▼
          │         Store in        Show Error
          │         localStorage    (Continue form)
          │              │
          │              ▼
          └─────────────────────┘
                     │
                     ▼
          ┌──────────────────────┐
          │ User Fills Form:     │
          │ • Name               │
          │ • Email              │
          │ • Subject            │
          │ • File (optional)    │
          └──────────────────────┘
                     │
                     ▼
          ┌──────────────────────┐
          │ /api/send-email      │
          │ (POST with FormData) │
          │ Validates & Sends    │
          └──────────────────────┘
                     │
          ┌──────────┴──────────┐
          │                     │
      Success              Error?
          │                     │
          ▼                     ▼
    ✅ Email Sent      ❌ Error Message
       Reset Form         Try Again
```

### File Structure

```
email-sender/
├── app/
│   ├── api/
│   │   ├── send-email/
│   │   │   └── route.ts          # Email sending API endpoint
│   │   └── verify-license/
│   │       └── route.ts          # License verification API endpoint
│   ├── license-verify/
│   │   └── page.tsx              # License verification page
│   ├── components/
│   │   └── LogoutButton.tsx       # Logout button component
│   ├── layout.tsx                # Root layout with dark theme
│   ├── page.tsx                  # Email sender form
│   ├── providers.tsx             # Provider setup
│   ├── LicenseGate.tsx           # License gating logic
│   └── globals.css               # Global styles (dark theme)
├── public/                       # Static assets
├── .env.local                    # Environment variables
├── .gitignore                    # Git ignore rules
├── package.json                  # Dependencies
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
├── next.config.js                # Next.js configuration
├── postcss.config.mjs            # PostCSS configuration
└── README.md                     # This file
```

---

## 🔧 Setup & Installation

### Prerequisites

- Node.js 18+ and npm/yarn
- Gmail account with App Password (not regular password)
- Git (for version control)

### Local Development

1. **Clone/Extract the repository**
   ```bash
   cd "Email Sender"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create `.env.local` in the root directory:
   ```env
   GMAIL_USER=your-email@gmail.com
   GMAIL_PASSWORD=your-app-password
   LICENSE_KEY=kuro
   ```

   **Getting Gmail App Password:**
   - Enable 2-Factor Authentication on Google Account
   - Visit [Google App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and "Windows Computer"
   - Copy the generated 16-character password
   - Remove any spaces before pasting into `.env.local`

4. **Run development server**
   ```bash
   npm run dev
   ```
   
   Visit: `http://localhost:3000`

5. **Test the flow**
   - You'll be redirected to `/license-verify`
   - Enter license key: `kuro`
   - On success, redirected to email form
   - Click logout button (top-right) to sign out

---

## 🚀 Deployment to Vercel

### Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Production-ready email sender"
   git remote add origin https://github.com/yourusername/email-sender.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import from GitHub repository
   - Framework: **Next.js**
   - Environment Variables:
     - `GMAIL_USER`: your-email@gmail.com
     - `GMAIL_PASSWORD`: app-password (no spaces)
     - `LICENSE_KEY`: kuro
   - Click "Deploy"

3. **Verify Deployment**
   - Visit your Vercel domain
   - Test license verification
   - Test email sending
   - Test theme toggle

---

## 📖 API Documentation

### POST `/api/verify-license`

**Purpose:** Validate license key against server-side environment variable

**Request Body:**
```json
{
  "licenseKey": "kuro"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "License verified successfully"
}
```

**Error Response (401):**
```json
{
  "success": false,
  "error": "Invalid license key"
}
```

**Error Response (500):**
```json
{
  "error": "Failed to verify license"
}
```

### POST `/api/send-email`

**Purpose:** Send email with optional file attachment

**Request Body:** FormData
```
name: string (required)
email: string (required, valid email)
subject: string (required)
file: File (optional, max 25MB)
```

**Success Response (200):**
```json
{
  "message": "Email sent successfully",
  "to": "recipient@example.com"
}
```

**Error Response (400):**
```json
{
  "error": "Invalid email address" | "Name is required" | etc.
}
```

**Error Response (500):**
```json
{
  "error": "Failed to send email: [reason]"
}
```

---

## 🔒 Security Features

1. **Environment Variables**
   - Gmail credentials stored in `.env.local` (never exposed)
   - License key stored server-side
   - All secrets use Vercel environment variables

2. **License Gate**
   - Client-side gating with server-side validation
   - API validates license against .env value
   - localStorage stores verification state

3. **Input Validation**
   - Email format validation with regex
   - File size limit enforcement (25MB)
   - Required field validation

4. **No Data Storage**
   - Emails not logged or stored
   - User data not persisted
   - Only transient localStorage (cleared on logout)

---

## 🛠️ Customization

### Change License Key

Edit `.env.local`:
```env
LICENSE_KEY=your-custom-key
```

Users must enter this exact key (case-sensitive) to access the emailing system.

### Change File Size Limit

In `app/api/send-email/route.ts`, update the `bodyParser` config:
```typescript
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb', // Change from 25mb to 50mb
    },
  },
};
```

### Customize Email Sender Address

In `app/api/send-email/route.ts`, the email is sent FROM: `process.env.GMAIL_USER` TO: user-provided email.

To send TO a different address, modify:
```typescript
to: email, // Change this to your address or dynamic logic
```

---

## 📦 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| next | ^15.0.0 | React framework with SSR |
| react | ^18.3.0 | UI library |
| typescript | ^5.3.0 | Type safety |
| tailwindcss | ^4.0.0 | Utility-first CSS |
| motion | ^12.0.0 | Animations |
| nodemailer | ^6.9.7 | Email service |

---

## 🧪 Testing Checklist

Before deploying to production:

- [ ] License verification works with key "kuro"
- [ ] Invalid license key shows error message
- [ ] Email sends to user-provided address
- [ ] File attachments work (test with 25MB file)
- [ ] Form validation works (try empty fields)
- [ ] Dark theme styling looks good
- [ ] Logout button clears session and returns to license page
- [ ] Responsive design on mobile (max-w-md)
- [ ] No console errors in browser
- [ ] No TypeScript errors (`npm run lint`)

---

## 🐛 Troubleshooting

### Email Not Sending

**Problem:** "Failed to send email"
- **Solution:** Check `GMAIL_PASSWORD` has no spaces
- **Solution:** Verify Gmail credentials in `.env.local`
- **Solution:** Ensure 2FA and App Password are set up

### License Verification Stuck

**Problem:** "License key not validating"
- **Solution:** Ensure `LICENSE_KEY=kuro` in `.env.local`
- **Solution:** Key is case-sensitive (must be lowercase "kuro")
- **Solution:** Clear browser localStorage and retry

### File Upload Fails

**Problem:** "File too large"
- **Solution:** File must be under 25MB
- **Solution:** Check `api.bodyParser.sizeLimit` in route.ts

---

## 📝 License

This project is provided as-is. Modify and deploy freely for your needs.

---

## 🎯 Production Checklist

Before going live:

- [ ] `.env.local` created with all variables
- [ ] `.env.local` added to `.gitignore` (don't commit secrets)
- [ ] Repository pushed to GitHub (public or private)
- [ ] Vercel environment variables configured
- [ ] Email sending tested end-to-end
- [ ] License verification tested
- [ ] Logout functionality tested
- [ ] Dark theme styling verified
- [ ] Responsive design verified on mobile
- [ ] TypeScript compilation successful (`npm run build`)
- [ ] No console warnings/errors
- [ ] Vercel deployment successful

---

## 🚀 Next Steps

1. **Fork/Clone** this repository
2. **Configure** `.env.local` with your credentials
3. **Test locally** with `npm run dev`
4. **Deploy** to Vercel following the deployment guide
5. **Share** your deployment URL

---

**Built with ❤️ using Next.js 15 & React 18**

Questions? Check the source code comments or review the API route implementations.
