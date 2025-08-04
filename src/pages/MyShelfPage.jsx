"use client"

import { Link } from "react-router-dom"
import { useState, useMemo } from "react"
import { useIndexedDB } from "../hooks/useIndexedDB"
import BookCard from "../components/BookCard"
import QRModal from "../components/QRModal"
import BookDetailsModal from "../components/BookDetailsModal"
import ConfirmModal from "../components/ConfirmModal"
import { Filter, SortAsc, SortDesc, QrCode, Search, BookOpen, Plus, Library } from "lucide-react"

export default function MyShelfPage() {
  const { books, loading, error, updateExistingBook, deleteExistingBook } = useIndexedDB()
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortBy, setSortBy] = useState("title")
  const [sortOrder, setSortOrder] = useState("asc")
  const [searchTerm, setSearchTerm] = useState("")
  const [isQRModalOpen, setIsQRModalOpen] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [bookToDelete, setBookToDelete] = useState(null)

  const filteredAndSortedBooks = useMemo(() => {
    let filtered = books

    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(lowerCaseSearchTerm) ||
          book.author.toLowerCase().includes(lowerCaseSearchTerm),
      )
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((book) => book.status === filterStatus)
    }

    const sorted = [...filtered].sort((a, b) => {
      const valA = a[sortBy].toLowerCase()
      const valB = b[sortBy].toLowerCase()

      if (valA < valB) return sortOrder === "asc" ? -1 : 1
      if (valA > valB) return sortOrder === "asc" ? 1 : -1
      return 0
    })

    return sorted
  }, [books, filterStatus, sortBy, sortOrder, searchTerm])

  const handleOpenDetails = (book) => {
    setSelectedBook(book)
    setIsDetailsModalOpen(true)
  }

  const handleCloseDetails = () => {
    setSelectedBook(null)
    setIsDetailsModalOpen(false)
  }

  const handleDeleteRequest = (book) => {
    setBookToDelete(book)
    setIsConfirmModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (bookToDelete) {
      await deleteExistingBook(bookToDelete.id)
      setIsConfirmModalOpen(false)
      setBookToDelete(null)
      handleCloseDetails()
    }
  }

  const availableBooks = books.filter(book => book.status === "available").length
  const borrowedBooks = books.filter(book => book.status === "borrowed").length

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="glass-effect rounded-2xl p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg text-gray-700 font-medium">Loading your shelf...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="glass-effect rounded-2xl p-8 text-center">
          <p className="text-lg text-destructive font-medium">Error: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-8">
      {/* Header */}
      <div className="text-center fade-in">
        <h1 className="text-4xl font-heading font-bold text-gradient mb-4">My Book Shelf</h1>
        <p className="text-gray-600 text-lg">Manage and organize your personal library</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 slide-up">
        <div className="glass-effect rounded-2xl p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow">
            <Library className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">{books.length}</h3>
          <p className="text-gray-600">Total Books</p>
        </div>
        <div className="glass-effect rounded-2xl p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">{availableBooks}</h3>
          <p className="text-gray-600">Available</p>
        </div>
        <div className="glass-effect rounded-2xl p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-secondary to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">{borrowedBooks}</h3>
          <p className="text-gray-600">Borrowed</p>
        </div>
      </div>

      {/* Controls */}
      <div className="glass-effect rounded-2xl p-6 slide-up" style={{ animationDelay: '0.1s' }}>
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Search */}
            <div className="flex items-center space-x-2 flex-1 max-w-md">
              <Search className="w-5 h-5 text-primary" />
              <input
                type="text"
                placeholder="Search by title or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field flex-1"
              />
            </div>

            {/* Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-primary" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="input-field min-w-[140px]"
              >
                <option value="all">All Statuses</option>
                <option value="available">Available</option>
                <option value="borrowed">Borrowed</option>
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-2">
              {sortOrder === "asc" ? (
                <SortAsc className="w-5 h-5 text-primary" />
              ) : (
                <SortDesc className="w-5 h-5 text-primary" />
              )}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field min-w-[120px]"
              >
                <option value="title">Title</option>
                <option value="author">Author</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                className="p-2 border border-gray-200 rounded-lg bg-white/50 hover:bg-white/80 transition-all duration-200"
              >
                {sortOrder === "asc" ? <SortAsc className="w-5 h-5" /> : <SortDesc className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Share Button */}
          <button
            onClick={() => setIsQRModalOpen(true)}
            className="btn-accent flex items-center space-x-2"
          >
            <QrCode className="w-5 h-5" />
            <span>Share Shelf</span>
          </button>
        </div>
      </div>

      {/* Books Grid */}
      {filteredAndSortedBooks.length === 0 ? (
        <div className="glass-effect rounded-2xl p-12 text-center slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-2xl font-heading font-semibold text-gray-800 mb-4">Your shelf is empty!</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Start building your personal library by adding your first book to the collection.
          </p>
          <Link
            to="/add-book"
            className="btn-primary inline-flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Your First Book</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedBooks.map((book, index) => (
            <div key={book.id} style={{ animationDelay: `${0.1 + index * 0.05}s` }}>
              <BookCard
                book={book}
                onOpenDetails={handleOpenDetails}
                onUpdate={updateExistingBook}
                onDeleteRequest={handleDeleteRequest}
              />
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      <QRModal isOpen={isQRModalOpen} onClose={() => setIsQRModalOpen(false)} />

      {selectedBook && (
        <BookDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={handleCloseDetails}
          book={selectedBook}
          onUpdate={updateExistingBook}
          onDeleteRequest={handleDeleteRequest}
        />
      )}

      {bookToDelete && (
        <ConfirmModal
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          onConfirm={handleConfirmDelete}
          title="Confirm Deletion"
          message={`Are you sure you want to delete "${bookToDelete.title}" by ${bookToDelete.author}? This action cannot be undone.`}
        />
      )}
    </div>
  )
}
