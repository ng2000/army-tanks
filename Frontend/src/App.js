
// export default App;
import {Routes , Route } from "react-router-dom"; 
import Demo from './demo/Demo';
import NavbarComponent from "./navbar/Navbar";
import Solutions from './solutions/Solutions';
import ProductFeatures from "./productFeatures/ProductFeatures";
import Banner from './banner/Banner';
import ApplyForAccess from "./applyForAccess/ApplyForAccess";
import FileUpload from  "./fileUpload/FileUpload";
import Footer from "./footer/Footer"

export default function App() { 
   return ( 
      <div className="App"> 
	      <NavbarComponent/>
        <Routes>
          <Route path ="/" element= {<><Banner /> <FileUpload /></>}/>
          <Route path ="/add" element= {<ApplyForAccess />}/> 
        </Routes> 
        <Footer />
  </div> 
); 
}