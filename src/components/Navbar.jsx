"use client"

import { Link, useLocation } from "react-router-dom"
import { Home, PlusCircle, BookOpen, QrCode, Menu, X } from "lucide-react"
import { useState } from "react"
import ShelfImportModal from "./ShelfImportModal"

export default function Navbar() {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/add-book", label: "Add Book", icon: PlusCircle },
    { path: "/my-shelf", label: "My Shelf", icon: BookOpen },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="glass sticky top-0 z-50 border-b border-white/20 backdrop-blur-xl">
      <div className="container-wide">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-glow-primary group-hover:shadow-glow-primary/80 transition-all duration-300">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-heading font-bold text-gradient-primary group-hover:scale-105 transition-transform duration-200">
              QuillCache
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 group ${
                    isActive(item.path)
                      ? 'bg-primary-100 text-primary-700 border border-primary-200 shadow-sm'
                      : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 transition-transform duration-200 ${
                    isActive(item.path) ? 'text-primary-600' : 'group-hover:scale-110'
                  }`} />
                  <span>{item.label}</span>
                </Link>
              )
            })}
            
            <button
              onClick={() => setIsImportModalOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl font-medium text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 transition-all duration-200 group"
              aria-label="Import Shelf via QR"
            >
              <QrCode className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              <span>Import</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-neutral-700 hover:bg-neutral-100 transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/20 bg-white/95 backdrop-blur-xl">
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                      isActive(item.path)
                        ? 'bg-primary-100 text-primary-700 border border-primary-200'
                        : 'text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
              
              <button
                onClick={() => {
                  setIsImportModalOpen(true)
                  setIsMobileMenuOpen(false)
                }}
                className="flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-neutral-700 hover:bg-neutral-100 transition-colors duration-200 w-full"
              >
                <QrCode className="w-5 h-5" />
                <span>Import Shelf</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <ShelfImportModal isOpen={isImportModalOpen} onClose={() => setIsImportModalOpen(false)} />
    </nav>
  )
}
