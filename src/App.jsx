import LandingPage from "./assets/components/LandingPage"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App = () => {

  return(
    <Router>
      <Routes>
      <Route path="/" element={<LandingPage/>}></Route>
      </Routes>
  
    </Router>

  )
}

export default App;