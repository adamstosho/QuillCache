"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useIndexedDB } from "../hooks/useIndexedDB"
import { BookOpen, User, FileText, Calendar, ArrowLeft, Plus, Sparkles } from "lucide-react"
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
    <div className="container-narrow px-4">
      <div className="glass rounded-2xl lg:rounded-3xl p-6 lg:p-8 slide-up">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 lg:mb-8 space-y-4 lg:space-y-0">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center shadow-glow-primary">
                <BookOpen className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-heading font-bold text-gradient-primary">Add New Book</h1>
                <p className="text-neutral-600 text-sm lg:text-base">Fill in the details to add a book to your shelf</p>
              </div>
            </div>
          </div>
          <div className="hidden lg:flex items-center space-x-2 text-sm">
            <Sparkles className="w-4 h-4 text-secondary-500" />
            <span className="text-neutral-500">Create your library</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-8">
          {/* Title */}
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="title" className="flex items-center text-sm font-semibold text-neutral-700">
              <BookOpen className="w-4 h-4 mr-2 text-primary-600" />
              Title <span className="text-error-600 ml-1">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input"
              placeholder="Enter book title"
              required
            />
          </div>

          {/* Author */}
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="author" className="flex items-center text-sm font-semibold text-neutral-700">
              <User className="w-4 h-4 mr-2 text-accent-600" />
              Author <span className="text-error-600 ml-1">*</span>
            </label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="input"
              placeholder="Enter author name"
              required
            />
          </div>

          {/* Genre and Year Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="genre" className="flex items-center text-sm font-semibold text-neutral-700">
                <FileText className="w-4 h-4 mr-2 text-secondary-600" />
                Genre
              </label>
              <input
                type="text"
                id="genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="input"
                placeholder="e.g., Fiction, Science, History"
              />
            </div>
            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="publishedYear" className="flex items-center text-sm font-semibold text-neutral-700">
                <Calendar className="w-4 h-4 mr-2 text-neutral-500" />
                Published Year
              </label>
              <input
                type="number"
                id="publishedYear"
                value={publishedYear}
                onChange={(e) => setPublishedYear(e.target.value)}
                className="input"
                placeholder="e.g., 2023"
                min="1800"
                max={new Date().getFullYear() + 1}
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="description" className="flex items-center text-sm font-semibold text-neutral-700">
              <FileText className="w-4 h-4 mr-2 text-accent-600" />
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="input resize-none"
              placeholder="Brief description of the book..."
            />
          </div>

          {/* Status */}
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="status" className="flex items-center text-sm font-semibold text-neutral-700">
              <BookOpen className="w-4 h-4 mr-2 text-secondary-600" />
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
              className="input"
            >
              <option value="available">Available</option>
              <option value="borrowed">Borrowed</option>
            </select>
          </div>

          {/* Borrowed By */}
          {status === "borrowed" && (
            <div className="space-y-2 lg:space-y-3 slide-up">
              <label htmlFor="borrowedBy" className="flex items-center text-sm font-semibold text-neutral-700">
                <User className="w-4 h-4 mr-2 text-secondary-600" />
                Borrowed By
              </label>
              <input
                type="text"
                id="borrowedBy"
                value={borrowedBy}
                onChange={(e) => setBorrowedBy(e.target.value)}
                className="input"
                placeholder="Name of the person who borrowed the book"
              />
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 lg:pt-6">
            <button
              type="button"
              onClick={() => navigate("/my-shelf")}
              className="btn-outline btn-md lg:btn-lg flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary btn-md lg:btn-lg flex items-center justify-center flex-1"
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
