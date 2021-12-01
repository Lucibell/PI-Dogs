import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import DogCreate from './components/DogCreate';
import DogDetail from './components/DogDetail'
import SearchBar from './components/SearchBar';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      {/* <Routes>
      <Route path = "/dogs/*"  element= {<SearchBar />} />
      </Routes> */}
      <Routes>
      <Route exact path="/" element = {<LandingPage/>}/>
      <Route path = "/dogs"  element = {<Home/>}/>
      <Route path = "/dog"  element = {<DogCreate/>}/>
      <Route path = "/dogs/:id" element= {<DogDetail />} /> 
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
