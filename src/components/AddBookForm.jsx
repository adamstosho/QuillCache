"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useIndexedDB } from "../hooks/useIndexedDB"
import toast from "react-hot-toast"

export default function AddBookForm() {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("available") // 'available' or 'borrowed'
  const [borrowedBy, setBorrowedBy] = useState("") // New state for borrowedBy
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
      status,
      borrowedBy: status === "borrowed" ? borrowedBy : "", // Only save if status is borrowed
    }

    try {
      await addNewBook(newBook)
      setTitle("")
      setAuthor("")
      setDescription("")
      setStatus("available")
      setBorrowedBy("")
      navigate("/my-shelf") // Redirect to shelf after adding
    } catch (error) {
      // Error handled by useIndexedDB hook, toast already shown
      console.error("Error adding book:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title <span className="text-error">*</span>
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
          required
          aria-required="true"
        />
      </div>
      <div>
        <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
          Author <span className="text-error">*</span>
        </label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
          required
          aria-required="true"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent resize-y"
        ></textarea>
      </div>
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value)
            if (e.target.value === "available") {
              setBorrowedBy("") // Clear borrowedBy if status changes to available
            }
          }}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <option value="available">Available</option>
          <option value="borrowed">Borrowed</option>
        </select>
      </div>
      {status === "borrowed" && (
        <div>
          <label htmlFor="borrowedBy" className="block text-sm font-medium text-gray-700 mb-1">
            Borrowed By
          </label>
          <input
            type="text"
            id="borrowedBy"
            value={borrowedBy}
            onChange={(e) => setBorrowedBy(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="Name of borrower"
          />
        </div>
      )}
      <button
        type="submit"
        className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-violet-700 transition-colors font-semibold shadow-md"
      >
        Add Book
      </button>
    </form>
  )
}
