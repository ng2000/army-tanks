
// export default App;
import { Routes, Route } from "react-router-dom";
import NavbarComponent from "./navbar/Navbar";
import Banner from './dataGrid/DataGrid';
import ApplyForAccess from "./addTank/AddTank";
import FileUploadImport from "./fileUploadImport/FileUploadImport";
import Footer from "./footer/Footer"
import Analytics from "./graphs/Analytics";
import DueDataGrid from "./dueDataGrid/DueDataGrid";
import TankSummary from "./tankSummary/TankSummary";

export default function App() {
  return (
    <div className="App">
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<><Banner /></>} />
        <Route path="/analytics" element={<><Analytics /></>} />
        <Route path="/import" element={<><FileUploadImport /></>} />
        <Route path="/add" element={<ApplyForAccess />} />
        <Route path="/search" element={<DueDataGrid />} />
        <Route path="/summary" element={<TankSummary baNo={'05X 4H'}/>} />
      </Routes>
      <Footer />
    </div>
  );
}