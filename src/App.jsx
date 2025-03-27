// import "./App.module.css";
// import marmotClose from "./assets/images/screaming_marmot_close.png";

// function App() {
//   return <div className="App">
//     <img src={marmotClose}></img>
//   </div>;
// }

// export default App;
// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import React from "react";
const AboutScream = React.lazy(() => import("./pages/AboutScream/AboutScream"));

function App() {
  return (
    <Router>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-scream" element={<AboutScream />} />
        </Routes>
      </React.Suspense>
    </Router>
  );
}

export default App;
