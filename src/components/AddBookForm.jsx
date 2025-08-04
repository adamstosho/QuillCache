import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useIndexedDB } from "../hooks/useIndexedDB"
import { BookOpen, User, FileText, Calendar, ArrowLeft, Plus } from "lucide-react"
import toast from "react-hot-toast"

export default function AddBookForm() {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [description, setDescription] = useState("")
  const [genre, setGenre] = useState("")
  const [publishedYear, setPublishedYear] = useState("")
  const [status, setStatus] = useState("available")
  const [borrowedBy, setBorrowedBy] = useState("")
  const { addNewBook } = useIndexedDB()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title || !author) {
      toast.error("Title and Author are required!")
      return
    }

    const newBook = {
      title,
      author,
      description,
      genre,
      publishedYear,
      status,
      borrowedBy: status === "borrowed" ? borrowedBy : "",
    }

    try {
      await addNewBook(newBook)
      setTitle("")
      setAuthor("")
      setDescription("")
      setGenre("")
      setPublishedYear("")
      setStatus("available")
      setBorrowedBy("")
      navigate("/my-shelf")
    } catch (error) {
      console.error("Error adding book:", error)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Book</h1>
          <p className="text-gray-600">Fill in the details to add a book to your shelf</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title and Author Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                <BookOpen className="w-4 h-4 inline mr-2 text-purple-600" />
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter book title"
                required
              />
            </div>
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2 text-blue-600" />
                Author <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter author name"
                required
              />
            </div>
          </div>

          {/* Genre and Year Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="w-4 h-4 inline mr-2 text-orange-600" />
                Genre
              </label>
              <input
                type="text"
                id="genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="e.g., Fiction, Science, History"
              />
            </div>
            <div>
              <label htmlFor="publishedYear" className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-2 text-gray-500" />
                Published Year
              </label>
              <input
                type="number"
                id="publishedYear"
                value={publishedYear}
                onChange={(e) => setPublishedYear(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                placeholder="e.g., 2023"
                min="1800"
                max={new Date().getFullYear() + 1}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              <FileText className="w-4 h-4 inline mr-2 text-blue-600" />
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Brief description of the book..."
            />
          </div>

          {/* Status and Borrowed By Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                <BookOpen className="w-4 h-4 inline mr-2 text-orange-600" />
                Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value)
                  if (e.target.value === "available") {
                    setBorrowedBy("")
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="available">Available</option>
                <option value="borrowed">Borrowed</option>
              </select>
            </div>
            {status === "borrowed" && (
              <div>
                <label htmlFor="borrowedBy" className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2 text-orange-600" />
                  Borrowed By
                </label>
                <input
                  type="text"
                  id="borrowedBy"
                  value={borrowedBy}
                  onChange={(e) => setBorrowedBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Name of the person who borrowed the book"
                />
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              type="button"
              onClick={() => navigate("/my-shelf")}
              className="flex items-center justify-center px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center justify-center px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 flex-1"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
