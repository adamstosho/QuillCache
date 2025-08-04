"use client"
import { QRCodeSVG } from "qrcode.react"
import { X } from "lucide-react"
import { useIndexedDB } from "../hooks/useIndexedDB"
import { encodeBooksToQR } from "../utils/helpers"
import toast from "react-hot-toast"

export default function QRModal({ isOpen, onClose }) {
  const { books } = useIndexedDB()
  const qrData = encodeBooksToQR(books)

  if (!isOpen) return null

  const handleCopy = () => {
    navigator.clipboard.writeText(qrData)
    toast.success("QR data copied to clipboard!")
  }

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
        <h2 className="text-2xl font-heading font-bold text-primary mb-4 text-center">Share Your Shelf</h2>
        {qrData ? (
          <div className="flex flex-col items-center">
            <p className="text-gray-700 mb-4 text-center">Scan this QR code to share your book shelf data.</p>
            <div className="p-2 border border-gray-200 rounded-lg">
              <QRCodeSVG value={qrData} size={256} level="H" />
            </div>
            <button
              onClick={handleCopy}
              className="mt-4 bg-accent text-white px-4 py-2 rounded-md hover:bg-cyan-600 transition-colors shadow-sm"
            >
              Copy QR Data
            </button>
            <p className="text-sm text-gray-500 mt-2 text-center">
              (Max data size for QR codes is limited. Large shelves might be truncated.)
            </p>
          </div>
        ) : (
          <p className="text-center text-gray-600">No books to generate QR code for, or data is too large.</p>
        )}
      </div>
    </div>
  )
}
