import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes/Routes";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import { Suspense } from "react";
function App() {
  return (
    <Router>
      <Suspense fallback={<h1>Loading....  </h1>}>
        <Routes />
        <ToastContainer position="top-right" autoClose={3000} />
      </Suspense>
    </Router>
  );
}

export default App;
