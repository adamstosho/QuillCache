# QuillCache PWA

A beautiful, offline-first Progressive Web App for managing your personal book collection and sharing it with others.

## Features

- 📚 **Book Management**: Add, edit, and organize your book collection
- 🔄 **Offline-First**: Works completely offline using IndexedDB
- 📱 **PWA Ready**: Install as a native app on any device
- 📋 **QR Code Sharing**: Share your book shelf via QR codes
- 🎨 **Beautiful UI**: Modern, responsive design with smooth animations
- ⚡ **Fast Performance**: Built with Vite and React

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Database**: IndexedDB (offline storage)
- **UI Components**: Radix UI + Custom components
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **QR Codes**: qrcode.react for sharing

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd quillcache-pwa
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
pnpm dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

```bash
npm run build
# or
pnpm build
```

The built files will be in the `dist` directory.

## Deployment

This project is configured for deployment on Vercel with the following setup:

- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **SPA Routing**: Configured with rewrites to handle client-side routing

## Project Structure

```
quillcache-pwa/
├── src/
│   ├── components/     # React components
│   ├── pages/         # Page components
│   ├── hooks/         # Custom React hooks
│   ├── utils/         # Utility functions
│   ├── App.jsx        # Main app component
│   └── main.jsx       # App entry point
├── public/            # Static assets
├── components/        # UI component library
├── vercel.json        # Vercel configuration
└── package.json       # Dependencies and scripts
```

## Logo

The project features a beautiful animated logo with:
- **Quill pen and book design** representing writing and reading
- **Gradient colors** using the brand theme
- **Smooth animations** for an engaging experience
- **Multiple variants** for different use cases (minimal, default, text-only)

## License

This project is licensed under the MIT License. 