"use client"

import { Link } from "react-router-dom"
import { useState, useMemo } from "react"
import { useIndexedDB } from "../hooks/useIndexedDB"
import BookCard from "../components/BookCard"
import QRModal from "../components/QRModal"
import BookDetailsModal from "../components/BookDetailsModal"
import ConfirmModal from "../components/ConfirmModal"
import { Filter, SortAsc, SortDesc, QrCode, Search, BookOpen, Plus, Library, TrendingUp, Users } from "lucide-react"

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
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-4">
        <div className="glass rounded-2xl lg:rounded-3xl p-8 lg:p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 lg:h-16 lg:w-16 border-b-2 border-primary-600 mx-auto mb-4 lg:mb-6"></div>
          <h3 className="text-lg lg:text-xl font-heading font-semibold text-neutral-800 mb-2">Loading your shelf...</h3>
          <p className="text-neutral-600 text-sm lg:text-base">Please wait while we fetch your books</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-4">
        <div className="glass rounded-2xl lg:rounded-3xl p-8 lg:p-12 text-center">
          <div className="w-12 h-12 lg:w-16 lg:h-16 bg-error-100 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6">
            <BookOpen className="w-6 h-6 lg:w-8 lg:h-8 text-error-600" />
          </div>
          <h3 className="text-lg lg:text-xl font-heading font-semibold text-neutral-800 mb-2">Error Loading Shelf</h3>
          <p className="text-error-600 mb-4 text-sm lg:text-base">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-primary btn-md"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container-wide space-y-6 lg:space-y-8 px-4">
      {/* Header */}
      <div className="text-center fade-in">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-gradient-primary mb-3 lg:mb-4">My Book Shelf</h1>
        <p className="text-base lg:text-lg text-neutral-600">Manage and organize your personal library</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 slide-up">
        <div className="glass rounded-xl lg:rounded-2xl p-4 lg:p-6 text-center">
          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-3 lg:mb-4 shadow-glow-primary">
            <Library className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
          </div>
          <h3 className="text-2xl lg:text-3xl font-bold text-neutral-800 mb-1">{books.length}</h3>
          <p className="text-neutral-600 font-medium text-sm lg:text-base">Total Books</p>
        </div>
        <div className="glass rounded-xl lg:rounded-2xl p-4 lg:p-6 text-center">
          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-success-500 to-success-600 rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-3 lg:mb-4 shadow-glow">
            <BookOpen className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
          </div>
          <h3 className="text-2xl lg:text-3xl font-bold text-neutral-800 mb-1">{availableBooks}</h3>
          <p className="text-neutral-600 font-medium text-sm lg:text-base">Available</p>
        </div>
        <div className="glass rounded-xl lg:rounded-2xl p-4 lg:p-6 text-center sm:col-span-2 lg:col-span-1">
          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-3 lg:mb-4 shadow-glow-secondary">
            <Users className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
          </div>
          <h3 className="text-2xl lg:text-3xl font-bold text-neutral-800 mb-1">{borrowedBooks}</h3>
          <p className="text-neutral-600 font-medium text-sm lg:text-base">Borrowed</p>
        </div>
      </div>

      {/* Controls */}
      <div className="glass rounded-xl lg:rounded-2xl p-4 lg:p-6 slide-up" style={{ animationDelay: '0.1s' }}>
        <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:gap-6 lg:items-center lg:justify-between">
          <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:gap-4 lg:flex-1">
            {/* Search */}
            <div className="flex items-center space-x-3 flex-1 max-w-md">
              <Search className="w-5 h-5 text-primary-600" />
              <input
                type="text"
                placeholder="Search by title or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input flex-1"
              />
            </div>

            {/* Filter */}
            <div className="flex items-center space-x-3">
              <Filter className="w-5 h-5 text-primary-600" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="input min-w-[140px]"
              >
                <option value="all">All Statuses</option>
                <option value="available">Available</option>
                <option value="borrowed">Borrowed</option>
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-3">
              {sortOrder === "asc" ? (
                <SortAsc className="w-5 h-5 text-primary-600" />
              ) : (
                <SortDesc className="w-5 h-5 text-primary-600" />
              )}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input min-w-[120px]"
              >
                <option value="title">Title</option>
                <option value="author">Author</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                className="p-2 border border-neutral-200 rounded-lg lg:rounded-xl bg-white/50 hover:bg-white/80 transition-all duration-200"
              >
                {sortOrder === "asc" ? <SortAsc className="w-5 h-5" /> : <SortDesc className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Share Button */}
          <button
            onClick={() => setIsQRModalOpen(true)}
            className="btn-accent btn-md flex items-center space-x-2 w-full lg:w-auto justify-center"
          >
            <QrCode className="w-5 h-5" />
            <span>Share Shelf</span>
          </button>
        </div>
      </div>

      {/* Books Grid */}
      {filteredAndSortedBooks.length === 0 ? (
        <div className="glass rounded-2xl lg:rounded-3xl p-8 lg:p-16 text-center slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="w-16 h-16 lg:w-24 lg:h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6 lg:mb-8">
            <BookOpen className="w-8 h-8 lg:w-12 lg:h-12 text-neutral-400" />
          </div>
          <h3 className="text-2xl lg:text-3xl font-heading font-semibold text-neutral-800 mb-3 lg:mb-4">Your shelf is empty!</h3>
          <p className="text-neutral-600 mb-6 lg:mb-8 max-w-md mx-auto text-base lg:text-lg">
            Start building your personal library by adding your first book to the collection.
          </p>
          <Link
            to="/add-book"
            className="btn-primary btn-md lg:btn-lg inline-flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Your First Book</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
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
