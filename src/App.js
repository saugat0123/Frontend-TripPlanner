
import './App.css';
import Header from './Header/Header';
import Body from './Body/Body';
import Footer from './Footer/footer'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/dist/jquery'
import 'popper.js'
import 'react-toastify/dist/ReactToastify.css'
import {BrowserRouter} from 'react-router-dom';
import { Redirect } from "react-router";
import {ToastContainer,toast,Zoom,Bounce} from 'react-toastify'
function App() {
  return (
    <BrowserRouter>
    <div className="App">
   
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
  <Header></Header>
<Body></Body>
<Footer></Footer>

    </div>
    </BrowserRouter>
    
  );
}

export default App;
