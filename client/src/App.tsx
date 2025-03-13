import './App.css'
import { Button } from './components/ui/button'
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Footer from "./components/Footer"
import Info from "./components/Info";

function App() {

  return (
    <div>
      <div className='w-1/2 m-auto'>
        <Navbar />
        <Hero />
        <Info />
        <Footer />
      </div>
    </div>
  )
}

export default App
