import { Routes, Route, Navigate } from "react-router-dom"
import { useState, useEffect } from "react"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import AddBookPage from "./pages/AddBookPage"
import MyShelfPage from "./pages/MyShelfPage"
import LogoDemo from "./components/LogoDemo"
import SimpleLogoTest from "./components/SimpleLogoTest"

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // Simulate a small delay to ensure everything is loaded
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading QuillCache...</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-book" element={<AddBookPage />} />
          <Route path="/my-shelf" element={<MyShelfPage />} />
          <Route path="/logo-demo" element={<LogoDemo />} />
          <Route path="/logo-test" element={<SimpleLogoTest />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}
