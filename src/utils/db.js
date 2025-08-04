import { openDB } from "idb"

const DB_NAME = "quillcache-db"
const DB_VERSION = 2 // Increment DB version for schema change
const STORE_NAME = "books"

/**
 * Initializes the IndexedDB database.
 * Creates the 'books' object store if it doesn't exist.
 */
export async function initDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db, oldVersion, newVersion, transaction) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, {
          keyPath: "id", // Unique ID for each book
          autoIncrement: true,
        })
        store.createIndex("title", "title", { unique: false })
        store.createIndex("author", "author", { unique: false })
        store.createIndex("status", "status", { unique: false }) // available/borrowed
        // New index for 'borrowedBy'
        store.createIndex("borrowedBy", "borrowedBy", { unique: false, multiEntry: false })
        console.log("IndexedDB object store created:", STORE_NAME)
      } else if (oldVersion < 2) {
        // Migration for existing databases from version 1 to 2
        const store = transaction.objectStore(STORE_NAME)
        if (!store.indexNames.contains("borrowedBy")) {
          store.createIndex("borrowedBy", "borrowedBy", { unique: false, multiEntry: false })
          console.log("IndexedDB index 'borrowedBy' created.")
        }
      }
    },
  })
}

/**
 * Adds a new book to the IndexedDB.
 * @param {object} bookData - The book object to add (e.g., { title, author, description, status, borrowedBy }).
 * @returns {Promise<number>} The ID of the added book.
 */
export async function addBook(bookData) {
  const db = await initDB()
  const tx = db.transaction(STORE_NAME, "readwrite")
  const store = tx.objectStore(STORE_NAME)
  const id = await store.add(bookData)
  await tx.done
  console.log("Book added with ID:", id, bookData)
  return id
}

/**
 * Retrieves all books from the IndexedDB.
 * @returns {Promise<Array<object>>} An array of book objects.
 */
export async function getAllBooks() {
  const db = await initDB()
  const books = await db.getAll(STORE_NAME)
  console.log("All books retrieved:", books)
  return books
}

/**
 * Updates an existing book in the IndexedDB.
 * @param {object} bookData - The book object with updated data (must include 'id').
 */
export async function updateBook(bookData) {
  const db = await initDB()
  const tx = db.transaction(STORE_NAME, "readwrite")
  const store = tx.objectStore(STORE_NAME)
  await store.put(bookData) // 'put' updates if ID exists, adds if not
  await tx.done
  console.log("Book updated:", bookData)
}

/**
 * Deletes a book from the IndexedDB by its ID.
 * @param {number} id - The ID of the book to delete.
 */
export async function deleteBook(id) {
  const db = await initDB()
  const tx = db.transaction(STORE_NAME, "readwrite")
  const store = tx.objectStore(STORE_NAME)
  await store.delete(id)
  await tx.done
  console.log("Book deleted with ID:", id)
}

/**
 * Clears all books from the IndexedDB.
 */
export async function clearAllBooks() {
  const db = await initDB()
  const tx = db.transaction(STORE_NAME, "readwrite")
  const store = tx.objectStore(STORE_NAME)
  await store.clear()
  await tx.done
  console.log("All books cleared from IndexedDB.")
}
