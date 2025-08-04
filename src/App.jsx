import { Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import AddBookPage from "./pages/AddBookPage"
import MyShelfPage from "./pages/MyShelfPage"
import LogoDemo from "./components/LogoDemo"
import SimpleLogoTest from "./components/SimpleLogoTest"

export default function App() {
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
