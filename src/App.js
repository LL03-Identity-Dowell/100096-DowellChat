import "./App.css";
import { Tooltip } from "react-tooltip";
import { Routes, Router } from "react-router-dom";
// import { createHashRouter } from "react-router-dom";
import "react-tooltip/dist/react-tooltip.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Container from "./container";
import Footer from "./container/Footer";
import { AppProvider } from "./container/ContextProvider/DataContext";
import Navbar from "./container/Header/Navbar";
import ScrollBar from "./container/Chats/message/ScrollBar";
function App() {
  // const router = createHashRouter([
  //   {
  //     path: "/",
  //     element: <Container />,
  //     loader: "",
  //   },
  // ]);
  return (
    <AppProvider>
      <div className="container-lg w-100 h-100">
        {/* <ScrollBar /> */}
        {/* <Navbar /> */}
        {/* <div className="container-fluid"> */}
        <Container />
        {/* </div> */}
        {/* <div className=""> */}
        <Footer />
        {/* </div> */}
      </div>
    </AppProvider>
  );
}

export default App;
