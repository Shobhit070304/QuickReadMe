import './App.css'
import Navbar from "./components/Navbar.jsx"
import Hero from "./components/Hero.jsx"
import Footer from "./components/Footer.jsx"
import Info from "./components/Info.jsx";

function App() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center py-6 px-2">
      <div className="w-full max-w-3xl bg-glass p-4 md:p-6">
        <Navbar />
        <Hero />
        <Info />
        <Footer />
      </div>
    </div>
  )
}

export default App
