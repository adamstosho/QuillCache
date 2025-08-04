
import { Link } from "react-router-dom"
import { useState, useMemo } from "react"
import { useIndexedDB } from "../hooks/useIndexedDB"
import BookCard from "../components/BookCard"
import QRModal from "../components/QRModal"
import BookDetailsModal from "../components/BookDetailsModal"
import ConfirmModal from "../components/ConfirmModal"
import { Filter, SortAsc, SortDesc, QrCode, Search, BookOpen, Plus, Library, Users } from "lucide-react"

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
        <div className="card text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Loading your shelf...</h3>
          <p className="text-gray-600 text-sm">Please wait while we fetch your books</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-4">
        <div className="card text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Error Loading Shelf</h3>
          <p className="text-red-600 mb-4 text-sm">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto space-y-6 px-4">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">My Book Shelf</h1>
        <p className="text-base text-gray-600">Manage and organize your personal library</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="card text-center">
          <div className="w-10 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Library className="w-5 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">{books.length}</h3>
          <p className="text-gray-600 font-medium text-sm">Total Books</p>
        </div>
        <div className="card text-center">
          <div className="w-10 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-3">
            <BookOpen className="w-5 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">{availableBooks}</h3>
          <p className="text-gray-600 font-medium text-sm">Available</p>
        </div>
        <div className="card text-center sm:col-span-2 lg:col-span-1">
          <div className="w-10 h-12 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Users className="w-5 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">{borrowedBooks}</h3>
          <p className="text-gray-600 font-medium text-sm">Borrowed</p>
        </div>
      </div>

      {/* Controls */}
      <div className="card">
        <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:gap-6 lg:items-center lg:justify-between">
          <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:gap-4 lg:flex-1">
            {/* Search */}
            <div className="flex items-center space-x-3 flex-1 max-w-md">
              <Search className="w-5 h-5 text-blue-600" />
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
              <Filter className="w-5 h-5 text-blue-600" />
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
                <SortAsc className="w-5 h-5 text-blue-600" />
              ) : (
                <SortDesc className="w-5 h-5 text-blue-600" />
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
                className="p-2 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition-colors"
              >
                {sortOrder === "asc" ? <SortAsc className="w-5 h-5" /> : <SortDesc className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
            <button
              onClick={() => setIsQRModalOpen(true)}
              className="btn btn-primary flex items-center space-x-2 justify-center"
            >
              <QrCode className="w-5 h-5" />
              <span>Share Shelf</span>
            </button>
          </div>
        </div>
      </div>

      {/* Books Grid */}
      {filteredAndSortedBooks.length === 0 ? (
        <div className="card text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">Your shelf is empty!</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto text-base">
            Start building your personal library by adding your first book to the collection.
          </p>
          <Link
            to="/add-book"
            className="btn btn-primary inline-flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Your First Book</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredAndSortedBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onOpenDetails={handleOpenDetails}
              onUpdate={updateExistingBook}
              onDeleteRequest={handleDeleteRequest}
            />
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
