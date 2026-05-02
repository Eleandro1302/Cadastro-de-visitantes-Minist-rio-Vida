# Ministério Vida - Registration App

A robust, modern, and responsive registration application designed to onboard visitors at Ministério Vida seamlessly. Built with cutting-edge tools to ensure high performance, top security data handling, and instant notification via Telegram bots.

## ✨ Features

- **Component-based Architecture**: Divided logically into reusable pieces (`HeroSection`, `RegistrationForm`, `TermsModal`, `SuccessScreen` and `Logo`).
- **Real-time Telegram Integration**: Sends complete payload securely directly to your custom bot on Telegram, saving data directly where it's needed with no delays.
- **Multilingual Support (i18n)**: Out of the box Portuguese (PT) and English (EN) translations.
- **Responsive Navigation**: Adapts flawlessly from a mobile phone to ultra-wide desktop monitors, leveraging Tailwind CSS utility classes.
- **Form Verification & Consent**: Requires users to accept customized GDPR-compliant consent configurations with built-in internationalized phone entry capabilities (`react-phone-number-input`). 
- **Graceful Redirects**: Redirects the user automatically to the Instagram native app using deep links, complete with browser fallback timeout. 

## 🏗️ Folder Structure

```
├── src/
│   ├── components/            # Reusable Presentational Components
│   │   ├── HeroSection.tsx    # Sidebar text and branding content
│   │   ├── Logo.tsx           # Vector-based visual logo  
│   │   ├── RegistrationForm.tsx # State-heavy form with dynamic visitor lines 
│   │   ├── SuccessScreen.tsx  # Completion callback and redirect handler
│   │   └── TermsModal.tsx     # Extended modal content for privacy policy
│   ├── services/              # API and Network configurations
│   │   └── api.ts             # Contains fetch logic directed at Express server
│   ├── i18n.ts                # React-i18next dictionary configurations
│   ├── App.tsx                # Main Orchestrator, gluing sections together
│   ├── main.tsx               # App Entrypoint 
│   └── index.css              # Globals & Tailwind setup 
├── server.ts                  # Backend Express node containing the /api/telegram logic
├── package.json               # Dependencies and scripts
└── public/                    # Static uncompiled assets
```

## 💻 Tech Stack

- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Lucide Icons**
- **i18next**
- **Express Backend (Vite integrated)**

## 🚀 Getting Started

To launch the project properly using the built-in development setup, run the development server via package scripts:

```bash
npm run dev
```

For production builds, simply run:

```bash
npm run build 
npm run start
```
