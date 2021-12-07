import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import DogCreate from './components/DogCreate';
import DogDetail from './components/DogDetail'
//import NavBar from './components/SearchBar';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      {/* <Routes>
      <Route path = "/dog*"  element= {<NavBar />} />
      </Routes> */}
      <Routes>
      <Route path="/" element = {<LandingPage/>}/>
      <Route path = "/dogs"  element = {<Home/>}/>
      <Route path = "/dog"  element = {<DogCreate/>}/>
      <Route path = "/dogs/:id" element= {<DogDetail />} /> 
  
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
