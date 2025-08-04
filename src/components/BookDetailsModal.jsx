"use client"

import { useState, useEffect } from "react"
import { X, CheckCircle, Trash2 } from "lucide-react"
import toast from "react-hot-toast"

export default function BookDetailsModal({ isOpen, onClose, book, onUpdate, onDeleteRequest }) {
  const [editedTitle, setEditedTitle] = useState(book.title)
  const [editedAuthor, setEditedAuthor] = useState(book.author)
  const [editedDescription, setEditedDescription] = useState(book.description)
  const [editedStatus, setEditedStatus] = useState(book.status)
  const [editedBorrowedBy, setEditedBorrowedBy] = useState(book.borrowedBy || "")

  // Update local state when book prop changes (e.g., after an update)
  useEffect(() => {
    if (book) {
      setEditedTitle(book.title)
      setEditedAuthor(book.author)
      setEditedDescription(book.description)
      setEditedStatus(book.status)
      setEditedBorrowedBy(book.borrowedBy || "")
    }
  }, [book])

  if (!isOpen || !book) return null

  const handleSave = async () => {
    if (!editedTitle || !editedAuthor) {
      toast.error("Title and Author cannot be empty!")
      return
    }

    const updatedBook = {
      ...book,
      title: editedTitle,
      author: editedAuthor,
      description: editedDescription,
      status: editedStatus,
      borrowedBy: editedStatus === "borrowed" ? editedBorrowedBy : "",
    }

    try {
      await onUpdate(updatedBook)
      onClose() // Close modal on successful update
    } catch (error) {
      // Error handled by useIndexedDB hook, toast already shown
      console.error("Failed to save book details:", error)
    }
  }

  const handleStatusToggle = () => {
    const newStatus = editedStatus === "available" ? "borrowed" : "available"
    setEditedStatus(newStatus)
    if (newStatus === "available") {
      setEditedBorrowedBy("") // Clear borrowedBy if status changes to available
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 shadow-xl max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-heading font-bold text-primary mb-4 text-center">Book Details</h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="detail-title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="detail-title"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </div>
          <div>
            <label htmlFor="detail-author" className="block text-sm font-medium text-gray-700 mb-1">
              Author
            </label>
            <input
              type="text"
              id="detail-author"
              value={editedAuthor}
              onChange={(e) => setEditedAuthor(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </div>
          <div>
            <label htmlFor="detail-description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="detail-description"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              rows="4"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent resize-y"
            ></textarea>
          </div>
          <div>
            <label htmlFor="detail-status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="detail-status"
              value={editedStatus}
              onChange={(e) => {
                setEditedStatus(e.target.value)
                if (e.target.value === "available") {
                  setEditedBorrowedBy("")
                }
              }}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="available">Available</option>
              <option value="borrowed">Borrowed</option>
            </select>
          </div>
          {editedStatus === "borrowed" && (
            <div>
              <label htmlFor="detail-borrowedBy" className="block text-sm font-medium text-gray-700 mb-1">
                Borrowed By
              </label>
              <input
                type="text"
                id="detail-borrowedBy"
                value={editedBorrowedBy}
                onChange={(e) => setEditedBorrowedBy(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Name of borrower"
              />
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={handleSave}
            className="flex items-center bg-primary text-white px-4 py-2 rounded-md hover:bg-violet-700 transition-colors font-semibold shadow-md"
          >
            <CheckCircle className="w-5 h-5 mr-2" /> Save Changes
          </button>
          <button
            onClick={() => onDeleteRequest(book)}
            className="flex items-center bg-error text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors font-semibold shadow-md"
          >
            <Trash2 className="w-5 h-5 mr-2" /> Delete Book
          </button>
        </div>
      </div>
    </div>
  )
}
