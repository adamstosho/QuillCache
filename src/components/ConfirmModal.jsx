"use client"

import { X, AlertTriangle } from "lucide-react"

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 shadow-xl max-w-sm w-full relative text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>
        <AlertTriangle className="w-16 h-16 text-error mx-auto mb-4" />
        <h2 className="text-2xl font-heading font-bold text-primary mb-2">{title}</h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-error text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors font-semibold"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}
