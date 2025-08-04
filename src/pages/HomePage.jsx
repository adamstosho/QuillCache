import { Link } from "react-router-dom"
import { BookOpen, PlusCircle, Share2, Star } from "lucide-react"
import SimpleLogo from "../components/SimpleLogo"

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-80px)]">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center space-y-8 px-4">
          {/* Hero Section */}
          <div className="space-y-6">
            <div className="space-y-4">
              {/* Large Logo Display */}
              <div className="flex flex-col items-center justify-center mb-8">
                <div className="mb-6">
                  <SimpleLogo size={80} />
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900">
                  QuillCache
                </h1>
              </div>
              
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Star className="w-5 h-5 text-yellow-500" />
                <p className="text-lg sm:text-xl text-gray-700 font-medium">
                  Your personal, offline-first community book exchange tracker
                </p>
                <Star className="w-5 h-5 text-yellow-500" />
              </div>
              
              <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
                Manage your books, share your shelf, and discover new reads with our beautiful, 
                intuitive interface designed for book lovers. Experience the future of personal library management.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <div className="flex items-center space-x-2 bg-green-100 text-green-700 px-3 py-1 rounded-full">
                <Star className="w-4 h-4" />
                <span className="font-medium">Offline First</span>
              </div>
              <div className="flex items-center space-x-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                <Star className="w-4 h-4" />
                <span className="font-medium">PWA Ready</span>
              </div>
              <div className="flex items-center space-x-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                <Star className="w-4 h-4" />
                <span className="font-medium">QR Sharing</span>
              </div>
            </div>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            <Link
              to="/add-book"
              className="card hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col items-center text-center h-full space-y-4 p-6">
                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center">
                  <PlusCircle className="w-8 h-8 text-white" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-gray-800">Add a New Book</h2>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    Log books with detailed information and track their status in your personal library.
                  </p>
                </div>
              </div>
            </Link>

            <Link
              to="/my-shelf"
              className="card hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col items-center text-center h-full space-y-4 p-6">
                <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-gray-800">View My Shelf</h2>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    Browse and manage your complete book collection with beautiful cards and easy controls.
                  </p>
                </div>
              </div>
            </Link>

            <Link
              to="/my-shelf"
              className="card hover:shadow-md transition-shadow md:col-span-2 lg:col-span-1"
            >
              <div className="flex flex-col items-center text-center h-full space-y-4 p-6">
                <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center">
                  <Share2 className="w-8 h-8 text-white" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-gray-800">Share Shelf</h2>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    Generate QR codes to easily share your book collection with friends and family.
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* PWA Info Card */}
          <div className="card max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <h3 className="text-lg font-semibold text-gray-800">Progressive Web App</h3>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm">
              This app can be installed on your device for offline use and provides a native app experience! 
              Enjoy seamless access to your library anywhere, anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
