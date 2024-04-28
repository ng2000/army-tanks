
// export default App;
import { Routes, Route } from "react-router-dom";
import NavbarComponent from "./navbar/Navbar";
import Banner from './dataGrid/DataGrid';
import ApplyForAccess from "./addTank/AddTank";
import FileUploadImport from "./fileUploadImport/FileUploadImport";
import Footer from "./footer/Footer"

export default function App() {
  return (
    <div className="App">
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<><Banner /></>} />
        <Route path="/import" element={<><FileUploadImport /></>} />
        <Route path="/add" element={<ApplyForAccess />} />
      </Routes>
      <Footer />
    </div>
  );
}