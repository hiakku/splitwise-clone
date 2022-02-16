import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homescreen from "./components/Homescreen/Homescreen";
import Settings from "./components/Settings/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Homescreen />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
