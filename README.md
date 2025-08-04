# QuillCache PWA

A beautiful, offline-first Progressive Web App for managing your personal book collection and sharing it with your community.

## 📖 Introduction

QuillCache is a modern web application that helps you keep track of your books, especially when lending them to friends and family. It works completely offline, so you can access your book collection anytime, anywhere, even without an internet connection.

## 🎯 The Problem It Solves

Many people love sharing books with friends and family, but it's easy to forget who borrowed which book and when. Traditional methods like sticky notes or memory often fail, leading to lost books and forgotten loans. QuillCache solves this by providing a simple, beautiful way to:

- Keep track of all your books in one place
- Remember who borrowed which book
- Share your book collection easily with others
- Access your library even without internet

## ✨ Main Features

### 📚 Book Management
- **Add Books**: Easily add new books with title, author, genre, and description
- **Edit Books**: Update book information anytime
- **Delete Books**: Remove books from your collection when needed
- **Book Status**: Mark books as "Available" or "Borrowed"

### 🔄 Offline-First Design
- **Works Offline**: All data is stored locally on your device
- **No Internet Required**: Access your library anytime, anywhere
- **Fast Performance**: Instant loading and smooth interactions

### 📱 Progressive Web App (PWA)
- **Install on Device**: Add to your phone's home screen like a native app
- **Native Experience**: Looks and feels like a regular mobile app
- **Automatic Updates**: Gets the latest features when you're online

### 📋 QR Code Sharing
- **Share Your Shelf**: Generate QR codes to share your book collection
- **Easy Sharing**: Friends can scan the QR code to see your books
- **Community Building**: Help others discover books they might like

### 🎨 Beautiful Interface
- **Modern Design**: Clean, intuitive interface that's easy to use
- **Responsive Layout**: Works perfectly on phones, tablets, and computers
- **Smooth Animations**: Pleasant visual feedback for all interactions

## 🚀 How to Use QuillCache

### Getting Started

1. **Open the App**: Visit the QuillCache website in your browser
2. **Install (Optional)**: Tap "Add to Home Screen" to install as an app
3. **Start Adding Books**: Click "Add a New Book" to begin building your library

### Adding Your First Book

1. **Navigate to Add Book**: Click the "Add a New Book" button on the home page
2. **Fill in Details**:
   - **Title**: Enter the book's title (required)
   - **Author**: Enter the author's name (required)
   - **Genre**: Choose the book's category (optional)
   - **Published Year**: Enter when the book was published (optional)
   - **Description**: Add a brief description of the book (optional)
3. **Set Status**: Choose "Available" if you have the book, or "Borrowed" if someone has it
4. **Save**: Click "Add Book" to save it to your collection

### Managing Your Book Collection

1. **View Your Shelf**: Click "View My Shelf" to see all your books
2. **Search Books**: Use the search bar to find specific books by title or author
3. **Filter Books**: Use the dropdown to show only available or borrowed books
4. **Sort Books**: Arrange books by title or author in alphabetical order
5. **Edit Books**: Click on any book card to view details and make changes
6. **Delete Books**: Remove books you no longer own from your collection

### Tracking Borrowed Books

1. **Mark as Borrowed**: When lending a book, change its status to "Borrowed"
2. **Add Borrower**: Enter the name of the person who borrowed the book
3. **Track Status**: Keep track of who has which book
4. **Mark as Available**: When the book is returned, change status back to "Available"

### Sharing Your Collection

1. **Generate QR Code**: Click "Share Shelf" on your shelf page
2. **Share the Code**: Send the QR code to friends via text, email, or social media
3. **Friends Can Scan**: Others can scan the QR code to see your book collection
4. **Discover Books**: Help friends find books they might want to borrow

### Using the App Offline

1. **First Visit**: Load the app once while online to save it locally
2. **Offline Access**: The app works completely offline after the first load
3. **Data Sync**: All changes are saved locally and will sync when you're back online

## 🛠️ Tools and Technologies Used

### Frontend Framework
- **React 18**: Modern JavaScript library for building user interfaces
- **Vite**: Fast build tool for quick development and optimized production builds

### Styling and UI
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Radix UI**: Accessible, unstyled UI components
- **Lucide React**: Beautiful, customizable icons

### Data Management
- **IndexedDB**: Browser-based database for offline data storage
- **React Hook Form**: Efficient form handling with validation

### Routing and Navigation
- **React Router DOM**: Client-side routing for smooth page transitions

### Additional Features
- **QR Code Generation**: qrcode.react for creating shareable QR codes
- **Toast Notifications**: react-hot-toast for user feedback
- **Form Validation**: Zod for type-safe form validation

### Development Tools
- **TypeScript**: Type-safe JavaScript development
- **PostCSS**: CSS processing and optimization
- **ESLint**: Code quality and consistency

## 📦 Installation and Setup

### Prerequisites
- **Node.js**: Version 18 or higher
- **Package Manager**: npm or pnpm

### Getting Started

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd quillcache-pwa
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open in Browser**
   - Navigate to [http://localhost:5173](http://localhost:5173)
   - The app will load and be ready to use

### Building for Production

```bash
npm run build
# or
pnpm build
```

The built files will be in the `dist` directory, ready for deployment.

## 🌐 Deployment

This project is configured for easy deployment on Vercel:

- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **SPA Routing**: Configured with rewrites for client-side routing

## 📁 Project Structure

```
quillcache-pwa/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Main page components
│   ├── hooks/         # Custom React hooks
│   ├── utils/         # Utility functions and database helpers
│   ├── App.jsx        # Main application component
│   └── main.jsx       # Application entry point
├── public/            # Static assets and PWA files
├── components/        # UI component library
├── vercel.json        # Deployment configuration
└── package.json       # Dependencies and scripts
```

## 🤝 Contributing

We welcome contributions! Please feel free to submit issues, feature requests, or pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern web technologies for the best user experience
- Designed with accessibility and usability in mind
- Inspired by the love of reading and sharing books with others

---

**Happy Reading! 📚✨** 