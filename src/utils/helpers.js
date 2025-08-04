// Placeholder for QR encoding and other utility functions
// This file contains functions for converting book data to JSON string for QR sharing.

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

// Other helper functions can be added here as needed, e.g., for data validation, formatting, etc.
