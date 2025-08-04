import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import AddBookPage from "./pages/AddBookPage"
import MyShelfPage from "./pages/MyShelfPage"
import LogoDemo from "./components/LogoDemo"
import SimpleLogoTest from "./components/SimpleLogoTest"
import { useIndexedDB } from "./hooks/useIndexedDB" // Import the hook

export default function App() {
  // Initialize IndexedDB and make its functions available globally via context if needed,
  // or pass them down as props. For simplicity, we'll use the hook directly in pages.
  // The useEffect in useIndexedDB ensures DB is initialized on app load.
  useIndexedDB()

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-book" element={<AddBookPage />} />
          <Route path="/my-shelf" element={<MyShelfPage />} />
          <Route path="/logo-demo" element={<LogoDemo />} />
          <Route path="/logo-test" element={<SimpleLogoTest />} />
        </Routes>
      </main>
    </div>
  )
}
