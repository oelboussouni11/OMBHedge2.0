import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Calculator from './pages/Calculator'
import Docs from './pages/Docs'
import Navbar from './components/Navbar'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/docs" element={<Docs />} />
      </Routes>
    </>
  )
}
