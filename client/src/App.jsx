import { Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard.jsx";
import Mainpage from "./mainpage.jsx";

function App() {
  function fun() {
    window.location.href =
      "https://pr-reviewer-backend.onrender.com/auth/github";
  }

  return (
    <div className="bg-red-500 min-h-screen">
      <div className="bg-white min-h-screen w-full flex flex-col justify-center items-center">
        <Routes>
          <Route path="/" element={<Mainpage></Mainpage>} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
