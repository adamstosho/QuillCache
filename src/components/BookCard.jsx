"use client"

import { BookOpen, User, Info, Trash2, Edit, Calendar, Tag, Eye, ArrowRight } from "lucide-react"

export default function BookCard({ book, onOpenDetails, onUpdate, onDeleteRequest }) {
  const handleStatusToggle = () => {
    const newStatus = book.status === "available" ? "borrowed" : "available"
    onUpdate({ ...book, status: newStatus, borrowedBy: newStatus === "available" ? "" : book.borrowedBy })
  }

  return (
    <div className="card card-hover group relative">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="mb-4 lg:mb-6">
          <div className="flex items-start justify-between mb-2 lg:mb-3">
            <h3 className="text-lg lg:text-xl font-heading font-semibold text-neutral-800 group-hover:text-primary-700 transition-colors line-clamp-2 flex-1 pr-2">
              {book.title}
            </h3>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => onOpenDetails(book)}
                className="p-1.5 lg:p-2 rounded-lg lg:rounded-xl bg-neutral-100 text-neutral-600 hover:bg-accent-100 hover:text-accent-700 transition-all duration-200 hover:scale-110"
                aria-label="View/Edit book details"
              >
                <Eye className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center text-neutral-700 mb-3 lg:mb-4">
            <User className="w-3.5 h-3.5 lg:w-4 lg:h-4 mr-2 text-accent-600 flex-shrink-0" />
            <span className="font-medium text-sm lg:text-base">{book.author}</span>
          </div>
        </div>

        {/* Description */}
        <div className="flex-1 mb-4 lg:mb-6">
          <div className="flex items-start">
            <Info className="w-3.5 h-3.5 lg:w-4 lg:h-4 mr-2 text-accent-600 mt-1 flex-shrink-0" />
            <p className="text-neutral-600 text-sm leading-relaxed line-clamp-3">
              {book.description || "No description provided."}
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="space-y-2 lg:space-y-3 mb-4 lg:mb-6">
          {book.genre && (
            <div className="flex items-center text-neutral-600 text-sm">
              <Tag className="w-3.5 h-3.5 lg:w-4 lg:h-4 mr-2 text-secondary-600 flex-shrink-0" />
              <span className="badge-secondary text-xs">
                {book.genre}
              </span>
            </div>
          )}
          
          {book.publishedYear && (
            <div className="flex items-center text-neutral-600 text-sm">
              <Calendar className="w-3.5 h-3.5 lg:w-4 lg:h-4 mr-2 text-neutral-500 flex-shrink-0" />
              <span className="font-medium">{book.publishedYear}</span>
            </div>
          )}

          {book.status === "borrowed" && book.borrowedBy && (
            <div className="flex items-center text-neutral-600 text-sm">
              <BookOpen className="w-3.5 h-3.5 lg:w-4 lg:h-4 mr-2 text-secondary-600 flex-shrink-0" />
              <span className="font-medium">Borrowed by: {book.borrowedBy}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 lg:pt-4 border-t border-neutral-200/50">
          <span
            className={`badge text-xs ${
              book.status === "available" ? "status-available" : "status-borrowed"
            }`}
          >
            {book.status === "available" ? "Available" : "Borrowed"}
          </span>

          <div className="flex items-center space-x-1 lg:space-x-2">
            <button
              onClick={handleStatusToggle}
              className="p-1.5 lg:p-2 rounded-lg lg:rounded-xl bg-secondary-100 text-secondary-700 hover:bg-secondary-200 transition-all duration-200 hover:scale-110"
              aria-label={`Mark as ${book.status === "available" ? "borrowed" : "available"}`}
            >
              <BookOpen className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
            </button>
            <button
              onClick={() => onOpenDetails(book)}
              className="p-1.5 lg:p-2 rounded-lg lg:rounded-xl bg-accent-100 text-accent-700 hover:bg-accent-200 transition-all duration-200 hover:scale-110"
              aria-label="Edit book details"
            >
              <Edit className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
            </button>
            <button
              onClick={() => onDeleteRequest(book)}
              className="p-1.5 lg:p-2 rounded-lg lg:rounded-xl bg-error-100 text-error-700 hover:bg-error-200 transition-all duration-200 hover:scale-110"
              aria-label="Delete book"
            >
              <Trash2 className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
            </button>
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
      </div>
    </div>
  )
}
