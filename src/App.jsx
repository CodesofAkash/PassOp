import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Manager from './components/Manager'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<div className ="fixed inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
    <Navbar/>
    <Manager/>
    <Footer/>
    </>
  )
}

export default App
