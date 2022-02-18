import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homescreen from "./modules/Homescreen/Homescreen";
import Settings from "./modules/Settings/Settings";

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
