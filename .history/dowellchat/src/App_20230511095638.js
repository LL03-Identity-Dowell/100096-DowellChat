import "./App.css";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Container from "./container";
import Footer from "./container/Footer";
import Navbar from "./container/Header/Navbar";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Container />
      <Footer />
    </div>
  );
}

export default App;
