import { Link } from "react-router-dom"
import { BookOpen, PlusCircle, Share2, Sparkles, ArrowRight, Star } from "lucide-react"
import Logo from "../components/Logo"

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-80px)] relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary-200/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent-200/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-secondary-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-primary-300/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="container-narrow">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center space-y-8 lg:space-y-12 px-4">
          {/* Hero Section */}
          <div className="space-y-6 lg:space-y-8 fade-in">
            <div className="space-y-4">
              {/* Large Logo Display */}
              <div className="flex flex-col items-center justify-center mb-8 lg:mb-12">
                <div className="mb-6 lg:mb-8">
                  <Logo size={120} showText={true} animated={true} id="hero-logo" />
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-heading font-bold text-gradient-primary">
                  QuillCache
                </h1>
              </div>
              
              <div className="flex items-center justify-center space-x-2 mb-4 lg:mb-6">
                <Sparkles className="w-5 h-5 lg:w-6 lg:h-6 text-secondary-500" />
                <p className="text-lg sm:text-xl lg:text-2xl text-neutral-700 font-medium">
                  Your personal, offline-first community book exchange tracker
                </p>
                <Sparkles className="w-5 h-5 lg:w-6 lg:h-6 text-secondary-500" />
              </div>
              
              <p className="text-base sm:text-lg lg:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed px-4">
                Manage your books, share your shelf, and discover new reads with our beautiful, 
                intuitive interface designed for book lovers. Experience the future of personal library management.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="flex flex-wrap justify-center gap-3 lg:gap-4 text-sm lg:text-base">
              <div className="flex items-center space-x-2 bg-success-100 text-success-700 px-3 py-1 rounded-full border border-success-200">
                <Star className="w-4 h-4" />
                <span className="font-medium">Offline First</span>
              </div>
              <div className="flex items-center space-x-2 bg-accent-100 text-accent-700 px-3 py-1 rounded-full border border-accent-200">
                <Star className="w-4 h-4" />
                <span className="font-medium">PWA Ready</span>
              </div>
              <div className="flex items-center space-x-2 bg-primary-100 text-primary-700 px-3 py-1 rounded-full border border-primary-200">
                <Star className="w-4 h-4" />
                <span className="font-medium">QR Sharing</span>
              </div>
            </div>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full max-w-6xl slide-up" style={{ animationDelay: '0.2s' }}>
            <Link
              to="/add-book"
              className="card card-hover group bounce-in"
              style={{ animationDelay: '0.3s' }}
            >
              <div className="flex flex-col items-center text-center h-full space-y-4 lg:space-y-6 p-6 lg:p-8">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-accent-500 to-accent-600 rounded-3xl flex items-center justify-center shadow-glow-accent group-hover:scale-110 transition-transform duration-300">
                  <PlusCircle className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                </div>
                <div className="space-y-2 lg:space-y-3">
                  <h2 className="text-xl lg:text-2xl font-heading font-semibold text-neutral-800">Add a New Book</h2>
                  <p className="text-neutral-600 leading-relaxed text-sm lg:text-base">
                    Log books with detailed information and track their status in your personal library.
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-accent-600 font-medium group-hover:translate-x-1 transition-transform duration-200">
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>

            <Link
              to="/my-shelf"
              className="card card-hover group bounce-in"
              style={{ animationDelay: '0.4s' }}
            >
              <div className="flex flex-col items-center text-center h-full space-y-4 lg:space-y-6 p-6 lg:p-8">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl flex items-center justify-center shadow-glow-primary group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                </div>
                <div className="space-y-2 lg:space-y-3">
                  <h2 className="text-xl lg:text-2xl font-heading font-semibold text-neutral-800">View My Shelf</h2>
                  <p className="text-neutral-600 leading-relaxed text-sm lg:text-base">
                    Browse and manage your complete book collection with beautiful cards and easy controls.
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-primary-600 font-medium group-hover:translate-x-1 transition-transform duration-200">
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>

            <Link
              to="/my-shelf"
              className="card card-hover group bounce-in md:col-span-2 lg:col-span-1"
              style={{ animationDelay: '0.5s' }}
            >
              <div className="flex flex-col items-center text-center h-full space-y-4 lg:space-y-6 p-6 lg:p-8">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-3xl flex items-center justify-center shadow-glow-secondary group-hover:scale-110 transition-transform duration-300">
                  <Share2 className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                </div>
                <div className="space-y-2 lg:space-y-3">
                  <h2 className="text-xl lg:text-2xl font-heading font-semibold text-neutral-800">Share Shelf</h2>
                  <p className="text-neutral-600 leading-relaxed text-sm lg:text-base">
                    Generate QR codes to easily share your book collection with friends and family.
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-secondary-600 font-medium group-hover:translate-x-1 transition-transform duration-200">
                  <span>Share</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </div>

          {/* PWA Info Card */}
          <div className="glass rounded-2xl lg:rounded-3xl p-6 lg:p-8 max-w-2xl mx-auto slide-up" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center justify-center space-x-2 lg:space-x-3 mb-3 lg:mb-4">
              <div className="w-2 h-2 lg:w-3 lg:h-3 bg-success-500 rounded-full animate-pulse"></div>
              <h3 className="text-base lg:text-lg font-heading font-semibold text-neutral-800">Progressive Web App</h3>
            </div>
            <p className="text-neutral-600 leading-relaxed text-sm lg:text-base">
              This app can be installed on your device for offline use and provides a native app experience! 
              Enjoy seamless access to your library anywhere, anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
