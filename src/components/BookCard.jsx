
import { BookOpen, User, Info, Trash2, Edit, Calendar, Tag, Eye } from "lucide-react"

export default function BookCard({ book, onOpenDetails, onUpdate, onDeleteRequest }) {
  const handleStatusToggle = () => {
    const newStatus = book.status === "available" ? "borrowed" : "available"
    onUpdate({ ...book, status: newStatus, borrowedBy: newStatus === "available" ? "" : book.borrowedBy })
  }

  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-800 flex-1 pr-2">
              {book.title}
            </h3>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => onOpenDetails(book)}
                className="p-1.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-700 transition-colors"
                aria-label="View/Edit book details"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center text-gray-700 mb-3">
            <User className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" />
            <span className="font-medium text-sm">{book.author}</span>
          </div>
        </div>

        {/* Description */}
        <div className="flex-1 mb-4">
          <div className="flex items-start">
            <Info className="w-4 h-4 mr-2 text-blue-600 mt-1 flex-shrink-0" />
            <p className="text-gray-600 text-sm leading-relaxed">
              {book.description || "No description provided."}
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="space-y-2 mb-4">
          {book.genre && (
            <div className="flex items-center text-gray-600 text-sm">
              <Tag className="w-4 h-4 mr-2 text-orange-600 flex-shrink-0" />
              <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs">
                {book.genre}
              </span>
            </div>
          )}
          
          {book.publishedYear && (
            <div className="flex items-center text-gray-600 text-sm">
              <Calendar className="w-4 h-4 mr-2 text-gray-500 flex-shrink-0" />
              <span className="font-medium">{book.publishedYear}</span>
            </div>
          )}

          {book.status === "borrowed" && book.borrowedBy && (
            <div className="flex items-center text-gray-600 text-sm">
              <BookOpen className="w-4 h-4 mr-2 text-orange-600 flex-shrink-0" />
              <span className="font-medium">Borrowed by: {book.borrowedBy}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              book.status === "available" 
                ? "bg-green-100 text-green-700" 
                : "bg-orange-100 text-orange-700"
            }`}
          >
            {book.status === "available" ? "Available" : "Borrowed"}
          </span>

          <div className="flex items-center space-x-1">
            <button
              onClick={handleStatusToggle}
              className="p-1.5 rounded-lg bg-orange-100 text-orange-700 hover:bg-orange-200 transition-colors"
              aria-label={`Mark as ${book.status === "available" ? "borrowed" : "available"}`}
            >
              <BookOpen className="w-4 h-4" />
            </button>
            <button
              onClick={() => onOpenDetails(book)}
              className="p-1.5 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
              aria-label="Edit book details"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDeleteRequest(book)}
              className="p-1.5 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
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
