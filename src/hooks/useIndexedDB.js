import React, { useState, useEffect, useCallback } from "react"
import { initDB, getAllBooks, addBook, updateBook, deleteBook, clearAllBooks } from "../utils/db"
import toast from "react-hot-toast"

/**
 * Custom hook to manage IndexedDB operations for books.
 * Provides state for books, loading status, and error, along with CRUD operations.
 */
export function useIndexedDB() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refreshBooks = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const fetchedBooks = await getAllBooks()
      setBooks(fetchedBooks)
    } catch (err) {
      console.error("Failed to fetch books from IndexedDB:", err)
      setError("Failed to load books.")
      toast.error("Failed to load books from your shelf.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // Initialize DB and fetch books on component mount
    initDB()
      .then(() => {
        refreshBooks()
      })
      .catch((err) => {
        console.error("Failed to initialize IndexedDB:", err)
        setError("Failed to initialize database.")
        toast.error("Database initialization failed.")
        setLoading(false)
      })
  }, [refreshBooks])

  const addNewBook = useCallback(
    async (bookData) => {
      try {
        const id = await addBook(bookData)
        toast.success("Book added successfully!")
        refreshBooks() // Refresh the list after adding
        return id
      } catch (err) {
        console.error("Failed to add book:", err)
        setError("Failed to add book.")
        toast.error("Failed to add book.")
        throw err // Re-throw to allow component to handle
      }
    },
    [refreshBooks],
  )

  const updateExistingBook = useCallback(
    async (bookData) => {
      try {
        await updateBook(bookData)
        toast.success("Book updated successfully!")
        refreshBooks() // Refresh the list after updating
      } catch (err) {
        console.error("Failed to update book:", err)
        setError("Failed to update book.")
        toast.error("Failed to update book.")
        throw err
      }
    },
    [refreshBooks],
  )

  const deleteExistingBook = useCallback(
    async (id) => {
      try {
        await deleteBook(id)
        toast.success("Book deleted successfully!")
        refreshBooks() // Refresh the list after deleting
      } catch (err) {
        console.error("Failed to delete book:", err)
        setError("Failed to delete book.")
        toast.error("Failed to delete book.")
        throw err
      }
    },
    [refreshBooks],
  )

  const clearAllExistingBooks = useCallback(async () => {
    try {
      await clearAllBooks()
      toast.success("All books cleared!")
      setBooks([]) // Clear state immediately
    } catch (err) {
      console.error("Failed to clear all books:", err)
      setError("Failed to clear all books.")
      toast.error("Failed to clear all books.")
      throw err
    }
  }, [])

  return {
    books,
    loading,
    error,
    addNewBook,
    updateExistingBook,
    deleteExistingBook,
    clearAllExistingBooks,
    refreshBooks,
  }
}
