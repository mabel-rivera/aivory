import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./components/home/Home"
import Index from "./components/index/Index"

function App() {

  return (
    <>
      <Router>
        {/* <Navar/> /*Se llama aqui para que sea global */}
        <Routes>
          <Route path="/" element = {<Index/>}/> 
          <Route path="/home" element = {<Home/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
