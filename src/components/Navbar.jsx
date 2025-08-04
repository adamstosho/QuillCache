"use client"

import { Link } from "react-router-dom"
import { Home, PlusCircle, BookOpen, QrCode } from "lucide-react"
import { useState } from "react"
import ShelfImportModal from "./ShelfImportModal"

export default function Navbar() {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)

  return (
    <nav className="glass-effect sticky top-0 z-50 border-b border-white/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-heading font-bold text-gradient hover:scale-105 transition-transform duration-200">
            QuillCache
          </Link>
          
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Link 
              to="/" 
              className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/20 transition-all duration-200 group"
            >
              <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline font-medium">Home</span>
            </Link>
            
            <Link 
              to="/add-book" 
              className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/20 transition-all duration-200 group"
            >
              <PlusCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline font-medium">Add Book</span>
            </Link>
            
            <Link 
              to="/my-shelf" 
              className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/20 transition-all duration-200 group"
            >
              <BookOpen className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline font-medium">My Shelf</span>
            </Link>
            
            <button
              onClick={() => setIsImportModalOpen(true)}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/20 transition-all duration-200 group"
              aria-label="Import Shelf via QR"
            >
              <QrCode className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline font-medium">Import</span>
            </button>
          </div>
        </div>
      </div>
      <ShelfImportModal isOpen={isImportModalOpen} onClose={() => setIsImportModalOpen(false)} />
    </nav>
  )
}
