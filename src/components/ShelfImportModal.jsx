"use client"

import { useState, useEffect, useRef } from "react"
import { Html5QrcodeScanner } from "html5-qrcode"
import { X, Scan, Clipboard } from "lucide-react"
import { useIndexedDB } from "../hooks/useIndexedDB"
import { decodeQRToBooks } from "../utils/helpers"
import toast from "react-hot-toast"

export default function ShelfImportModal({ isOpen, onClose }) {
  const { addNewBook, refreshBooks } = useIndexedDB()
  const [scanMode, setScanMode] = useState(true) // true for scan, false for manual input
  const [manualInput, setManualInput] = useState("")
  const qrCodeScannerRef = useRef(null)
  const scannerInstanceRef = useRef(null)

  useEffect(() => {
    if (isOpen && scanMode) {
      // Ensure scanner is initialized only when modal is open and in scan mode
      if (!scannerInstanceRef.current) {
        scannerInstanceRef.current = new Html5QrcodeScanner(
          "qr-reader",
          { fps: 10, qrbox: { width: 250, height: 250 } },
          false, // verbose
        )
      }

      const onScanSuccess = async (decodedText, decodedResult) => {
        console.log(`QR Code detected: ${decodedText}`, decodedResult)
        toast.success("QR code scanned successfully!")
        await handleImport(decodedText)
        scannerInstanceRef.current.clear() // Stop scanner
        onClose()
      }

      const onScanError = (errorMessage) => {
        // console.warn(`QR Code scan error: ${errorMessage}`);
      }

      // Start the scanner
      scannerInstanceRef.current.render(onScanSuccess, onScanError)
    } else if (scannerInstanceRef.current) {
      // Clear scanner when modal closes or mode changes
      scannerInstanceRef.current.clear().catch((err) => console.error("Failed to clear scanner:", err))
      scannerInstanceRef.current = null // Reset instance
    }

    // Cleanup on unmount
    return () => {
      if (scannerInstanceRef.current) {
        scannerInstanceRef.current.clear().catch((err) => console.error("Failed to clear scanner on unmount:", err))
        scannerInstanceRef.current = null
      }
    }
  }, [isOpen, scanMode, onClose])

  const handleImport = async (dataString) => {
    const importedBooks = decodeQRToBooks(dataString)
    if (importedBooks.length === 0) {
      toast.error("No valid book data found in QR/input.")
      return
    }

    let addedCount = 0
    for (const book of importedBooks) {
      try {
        // Add book. IndexedDB will assign a new ID.
        // We might want to check for duplicates based on title/author before adding
        // For simplicity, we'll just add them for now.
        await addNewBook(book)
        addedCount++
      } catch (error) {
        console.error("Failed to add imported book:", book.title, error)
        // Continue to add other books even if one fails
      }
    }
    if (addedCount > 0) {
      toast.success(`${addedCount} book(s) imported successfully!`)
      refreshBooks() // Refresh the shelf after import
    } else {
      toast.error("No new books were imported.")
    }
    onClose()
  }

  const handleManualImport = () => {
    handleImport(manualInput)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 shadow-xl max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-heading font-bold text-primary mb-4 text-center">Import Shelf</h2>

        <div className="flex justify-center mb-4 space-x-2">
          <button
            onClick={() => setScanMode(true)}
            className={`flex items-center px-4 py-2 rounded-md transition-colors ${
              scanMode ? "bg-primary text-white shadow-md" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <Scan className="w-5 h-5 mr-2" /> Scan QR
          </button>
          <button
            onClick={() => setScanMode(false)}
            className={`flex items-center px-4 py-2 rounded-md transition-colors ${
              !scanMode ? "bg-primary text-white shadow-md" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <Clipboard className="w-5 h-5 mr-2" /> Manual Input
          </button>
        </div>

        {scanMode ? (
          <div className="flex flex-col items-center">
            <p className="text-gray-700 mb-4 text-center">Position a QR code within the scanning area.</p>
            <div
              id="qr-reader"
              className="w-full max-w-[300px] h-[300px] border border-gray-300 rounded-lg overflow-hidden"
            ></div>
            <p className="text-sm text-gray-500 mt-4 text-center">
              (Requires camera access. If scanning doesn't work, try manual input.)
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-gray-700 mb-4 text-center">Paste the JSON data of a book shelf below.</p>
            <textarea
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              rows="8"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent resize-y"
              placeholder='e.g., [{"title":"Book A", "author":"Author X", "status":"available", ...}]'
              aria-label="Manual JSON input for book shelf"
            ></textarea>
            <button
              onClick={handleManualImport}
              className="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-violet-700 transition-colors shadow-md"
            >
              Import Books
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
