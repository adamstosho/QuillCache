// Placeholder for QR encoding/decoding and other utility functions
// This file will contain functions for converting book data to JSON string for QR,
// and parsing JSON string from QR for importing shelves.

/**
 * Encodes an array of book data into a JSON string suitable for QR code.
 * @param {Array<object>} books - An array of book objects.
 * @returns {string} A JSON string representing the books.
 */
export function encodeBooksToQR(books) {
  try {
    // We might want to strip 'id' or other internal IndexedDB keys if not needed for sharing
    // Also, ensure the data size is reasonable for QR codes.
    const shareableBooks = books.map(({ id, ...rest }) => rest)
    return JSON.stringify(shareableBooks)
  } catch (error) {
    console.error("Error encoding books for QR:", error)
    return ""
  }
}

/**
 * Decodes a JSON string from a QR code into an array of book data.
 * @param {string} qrDataString - The JSON string from the QR code.
 * @returns {Array<object>} An array of parsed book objects.
 */
export function decodeQRToBooks(qrDataString) {
  try {
    const parsedBooks = JSON.parse(qrDataString)
    if (!Array.isArray(parsedBooks)) {
      throw new Error("QR data is not a valid array of books.")
    }
    // Optionally, validate the structure of each book object here
    // e.g., check for 'title', 'author', 'description', 'status'
    const validatedBooks = parsedBooks.filter(
      (book) =>
        book.title && book.author && book.description && (book.status === "available" || book.status === "borrowed"),
    )
    return validatedBooks
  } catch (error) {
    console.error("Error decoding QR data to books:", error)
    return []
  }
}

// Other helper functions can be added here as needed, e.g., for data validation, formatting, etc.
