"use client"

import { Link } from "react-router-dom" // Corrected import
import { useState, useMemo } from "react"
import { useIndexedDB } from "../hooks/useIndexedDB"
import BookCard from "../components/BookCard"
import QRModal from "../components/QRModal"
import BookDetailsModal from "../components/BookDetailsModal"
import ConfirmModal from "../components/ConfirmModal"
import { Filter, SortAsc, SortDesc, QrCode, Search } from "lucide-react"

export default function MyShelfPage() {
  const { books, loading, error, updateExistingBook, deleteExistingBook } = useIndexedDB()
  const [filterStatus, setFilterStatus] = useState("all") // 'all', 'available', 'borrowed'
  const [sortBy, setSortBy] = useState("title") // 'title', 'author'
  const [sortOrder, setSortOrder] = useState("asc") // 'asc', 'desc'
  const [searchTerm, setSearchTerm] = useState("") // New state for search
  const [isQRModalOpen, setIsQRModalOpen] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false) // New state for details modal
  const [selectedBook, setSelectedBook] = useState(null) // New state for selected book
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false) // New state for confirm modal
  const [bookToDelete, setBookToDelete] = useState(null) // New state for book to delete

  const filteredAndSortedBooks = useMemo(() => {
    let filtered = books

    // Search
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(lowerCaseSearchTerm) ||
          book.author.toLowerCase().includes(lowerCaseSearchTerm),
      )
    }

    // Filter by status
    if (filterStatus !== "all") {
      filtered = filtered.filter((book) => book.status === filterStatus)
    }

    // Sort
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
      handleCloseDetails() // Close details modal if open for the deleted book
    }
  }

  if (loading) {
    return (
      <div className="text-center text-gray-600 text-lg mt-8">
        Loading your shelf...
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mt-4"></div>
      </div>
    )
  }

  if (error) {
    return <div className="text-center text-error text-lg mt-8">Error: {error}</div>
  }

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-3xl font-heading font-bold text-primary mb-6">My Book Shelf</h1>

      <div className="bg-white rounded-2xl p-4 shadow-md w-full max-w-4xl mb-6 flex flex-wrap justify-center gap-4">
        {/* Search */}
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Search className="w-5 h-5 text-primary" />
          <label htmlFor="search" className="sr-only">
            Search books
          </label>
          <input
            type="text"
            id="search"
            placeholder="Search by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent w-full"
          />
        </div>

        {/* Filter */}
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-primary" />
          <label htmlFor="filterStatus" className="sr-only">
            Filter by Status
          </label>
          <select
            id="filterStatus"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="all">All Statuses</option>
            <option value="available">Available</option>
            <option value="borrowed">Borrowed</option>
          </select>
        </div>

        {/* Sort By */}
        <div className="flex items-center space-x-2">
          {sortOrder === "asc" ? (
            <SortAsc className="w-5 h-5 text-primary" />
          ) : (
            <SortDesc className="w-5 h-5 text-primary" />
          )}
          <label htmlFor="sortBy" className="sr-only">
            Sort By
          </label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="title">Title</option>
            <option value="author">Author</option>
          </select>
        </div>

        {/* Sort Order */}
        <div className="flex items-center space-x-2">
          <label htmlFor="sortOrder" className="sr-only">
            Sort Order
          </label>
          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="p-2 border border-gray-300 rounded-md bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label={`Sort order: ${sortOrder === "asc" ? "Ascending" : "Descending"}`}
          >
            {sortOrder === "asc" ? <SortAsc className="w-5 h-5" /> : <SortDesc className="w-5 h-5" />}
          </button>
        </div>

        {/* Share Shelf Button */}
        <button
          onClick={() => setIsQRModalOpen(true)}
          className="flex items-center space-x-2 bg-accent text-white px-4 py-2 rounded-md hover:bg-cyan-600 transition-colors shadow-sm"
        >
          <QrCode className="w-5 h-5" />
          <span>Share Shelf</span>
        </button>
      </div>

      {filteredAndSortedBooks.length === 0 ? (
        <div className="bg-white rounded-2xl p-6 shadow-md w-full max-w-4xl text-center text-gray-600">
          <p className="text-lg mb-4">Your shelf is empty!</p>
          <p>
            Go to the{" "}
            <Link to="/add-book" className="text-primary hover:underline">
              Add Book
            </Link>{" "}
            page to start logging your books.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
          {filteredAndSortedBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onOpenDetails={handleOpenDetails}
              onUpdate={updateExistingBook} // Pass for quick status toggle
              onDeleteRequest={handleDeleteRequest} // Pass for quick delete
            />
          ))}
        </div>
      )}

      <QRModal isOpen={isQRModalOpen} onClose={() => setIsQRModalOpen(false)} />

      {selectedBook && (
        <BookDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={handleCloseDetails}
          book={selectedBook}
          onUpdate={updateExistingBook}
          onDeleteRequest={handleDeleteRequest} // Pass the request handler
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
