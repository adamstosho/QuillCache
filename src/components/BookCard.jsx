"use client"

import { BookOpen, User, Info, Trash2, Edit, Calendar, Tag } from "lucide-react"

export default function BookCard({ book, onOpenDetails, onUpdate, onDeleteRequest }) {
  const handleStatusToggle = () => {
    const newStatus = book.status === "available" ? "borrowed" : "available"
    onUpdate({ ...book, status: newStatus, borrowedBy: newStatus === "available" ? "" : book.borrowedBy })
  }

  return (
    <div className="glass-effect rounded-2xl p-6 card-hover group">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-xl font-heading font-semibold text-primary mb-2 group-hover:text-primary/80 transition-colors line-clamp-2">
            {book.title}
          </h3>
          <div className="flex items-center text-gray-700 mb-3">
            <User className="w-4 h-4 mr-2 text-accent flex-shrink-0" />
            <span className="font-medium">{book.author}</span>
          </div>
        </div>

        {/* Description */}
        <div className="flex-1 mb-4">
          <div className="flex items-start">
            <Info className="w-4 h-4 mr-2 text-accent mt-1 flex-shrink-0" />
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
              {book.description || "No description provided."}
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="space-y-2 mb-4">
          {book.genre && (
            <div className="flex items-center text-gray-600 text-sm">
              <Tag className="w-4 h-4 mr-2 text-secondary flex-shrink-0" />
              <span className="bg-secondary/10 text-secondary px-2 py-1 rounded-full text-xs font-medium">
                {book.genre}
              </span>
            </div>
          )}
          
          {book.publishedYear && (
            <div className="flex items-center text-gray-600 text-sm">
              <Calendar className="w-4 h-4 mr-2 text-gray-500 flex-shrink-0" />
              <span>{book.publishedYear}</span>
            </div>
          )}

          {book.status === "borrowed" && book.borrowedBy && (
            <div className="flex items-center text-gray-600 text-sm">
              <BookOpen className="w-4 h-4 mr-2 text-secondary flex-shrink-0" />
              <span className="font-medium">Borrowed by: {book.borrowedBy}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200/50">
          <span
            className={`status-badge ${
              book.status === "available" ? "status-available" : "status-borrowed"
            }`}
          >
            {book.status === "available" ? "Available" : "Borrowed"}
          </span>

          <div className="flex space-x-2">
            <button
              onClick={() => onOpenDetails(book)}
              className="p-2 rounded-full bg-accent text-white hover:bg-accent/90 transition-all duration-200 shadow-sm hover:shadow-md hover:scale-110"
              aria-label="View/Edit book details"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={handleStatusToggle}
              className="p-2 rounded-full bg-secondary text-white hover:bg-secondary/90 transition-all duration-200 shadow-sm hover:shadow-md hover:scale-110"
              aria-label={`Mark as ${book.status === "available" ? "borrowed" : "available"}`}
            >
              <BookOpen className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDeleteRequest(book)}
              className="p-2 rounded-full bg-destructive text-white hover:bg-destructive/90 transition-all duration-200 shadow-sm hover:shadow-md hover:scale-110"
              aria-label="Delete book"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
