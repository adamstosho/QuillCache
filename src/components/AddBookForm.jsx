"use client"

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
    <div className="max-w-2xl mx-auto">
      <div className="glass-effect rounded-2xl p-8 slide-up">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-gradient mb-2">Add New Book</h1>
            <p className="text-gray-600">Fill in the details to add a book to your shelf</p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-2xl flex items-center justify-center shadow-glow">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <label htmlFor="title" className="flex items-center text-sm font-semibold text-gray-700">
              <BookOpen className="w-4 h-4 mr-2 text-primary" />
              Title <span className="text-destructive ml-1">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-field"
              placeholder="Enter book title"
              required
            />
          </div>

          {/* Author */}
          <div className="space-y-2">
            <label htmlFor="author" className="flex items-center text-sm font-semibold text-gray-700">
              <User className="w-4 h-4 mr-2 text-accent" />
              Author <span className="text-destructive ml-1">*</span>
            </label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="input-field"
              placeholder="Enter author name"
              required
            />
          </div>

          {/* Genre and Year Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="genre" className="flex items-center text-sm font-semibold text-gray-700">
                <FileText className="w-4 h-4 mr-2 text-secondary" />
                Genre
              </label>
              <input
                type="text"
                id="genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="input-field"
                placeholder="e.g., Fiction, Science, History"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="publishedYear" className="flex items-center text-sm font-semibold text-gray-700">
                <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                Published Year
              </label>
              <input
                type="number"
                id="publishedYear"
                value={publishedYear}
                onChange={(e) => setPublishedYear(e.target.value)}
                className="input-field"
                placeholder="e.g., 2023"
                min="1800"
                max={new Date().getFullYear() + 1}
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label htmlFor="description" className="flex items-center text-sm font-semibold text-gray-700">
              <FileText className="w-4 h-4 mr-2 text-accent" />
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="input-field resize-none"
              placeholder="Brief description of the book..."
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label htmlFor="status" className="flex items-center text-sm font-semibold text-gray-700">
              <BookOpen className="w-4 h-4 mr-2 text-secondary" />
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
              className="input-field"
            >
              <option value="available">Available</option>
              <option value="borrowed">Borrowed</option>
            </select>
          </div>

          {/* Borrowed By */}
          {status === "borrowed" && (
            <div className="space-y-2 slide-up">
              <label htmlFor="borrowedBy" className="flex items-center text-sm font-semibold text-gray-700">
                <User className="w-4 h-4 mr-2 text-secondary" />
                Borrowed By
              </label>
              <input
                type="text"
                id="borrowedBy"
                value={borrowedBy}
                onChange={(e) => setBorrowedBy(e.target.value)}
                className="input-field"
                placeholder="Name of the person who borrowed the book"
              />
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/my-shelf")}
              className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary to-purple-600 text-white rounded-lg hover:from-primary/90 hover:to-purple-600/90 transition-all duration-200 font-semibold shadow-md hover:shadow-lg flex-1"
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
