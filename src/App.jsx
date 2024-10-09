import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import { Toaster } from "./components/ui/toaster";
function App() {
  return (
    <>
      <div className="bg-gradient-to-b from-gray-800 via-gray-900 to-black h-full scroll-smooth">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Router>
        <Toaster />
      </div>
    </>
  );
}

export default App;
