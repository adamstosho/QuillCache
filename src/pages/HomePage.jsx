import { Link } from "react-router-dom"
import { BookOpen, PlusCircle, Share2, Sparkles } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center text-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto fade-in">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-6xl font-heading font-bold text-gradient mb-4 slide-up">
            Welcome to QuillCache!
          </h1>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="w-6 h-6 text-secondary" />
            <p className="text-lg sm:text-xl text-gray-700 font-medium">
              Your personal, offline-first community book exchange tracker
            </p>
            <Sparkles className="w-6 h-6 text-secondary" />
          </div>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Manage your books, share your shelf, and discover new reads with our beautiful, 
            intuitive interface designed for book lovers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-12">
          <Link
            to="/add-book"
            className="glass-effect rounded-2xl p-8 card-hover group bounce-in"
            style={{ animationDelay: '0.1s' }}
          >
            <div className="flex flex-col items-center justify-center text-center h-full">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-cyan-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-glow">
                <PlusCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-heading font-semibold text-gray-800 mb-3">Add a New Book</h2>
              <p className="text-gray-600 leading-relaxed">Log books with detailed information and track their status in your personal library.</p>
            </div>
          </Link>

          <Link
            to="/my-shelf"
            className="glass-effect rounded-2xl p-8 card-hover group bounce-in"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="flex flex-col items-center justify-center text-center h-full">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-glow">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-heading font-semibold text-gray-800 mb-3">View My Shelf</h2>
              <p className="text-gray-600 leading-relaxed">Browse and manage your complete book collection with beautiful cards and easy controls.</p>
            </div>
          </Link>

          <Link
            to="/my-shelf"
            className="glass-effect rounded-2xl p-8 card-hover group bounce-in"
            style={{ animationDelay: '0.3s' }}
          >
            <div className="flex flex-col items-center justify-center text-center h-full">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary to-amber-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-glow">
                <Share2 className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-heading font-semibold text-gray-800 mb-3">Share Shelf</h2>
              <p className="text-gray-600 leading-relaxed">Generate QR codes to easily share your book collection with friends and family.</p>
            </div>
          </Link>
        </div>

        <div className="glass-effect rounded-2xl p-6 max-w-2xl mx-auto slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-sm font-medium text-gray-700">Progressive Web App</p>
          </div>
          <p className="text-sm text-gray-600">
            This app can be installed on your device for offline use and provides a native app experience!
          </p>
        </div>
      </div>
    </div>
  )
}
