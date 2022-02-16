import { useCallback, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import SwitchButton from "../SwitchButton/SwitchButton";
import "./Settings.css";

const Settings = () => {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const isDarkTheme =
      localStorage.getItem("theme")?.toString() === "true" ? true : false;
    if (isDarkTheme) {
      setIsDark(true);
      document.body.setAttribute("data-theme", "dark");
    } else {
      document.body.setAttribute("data-theme", "light");
      setIsDark(false);
    }
  }, []);
  const handleChange = useCallback((isChecked) => {
    setIsDark(isChecked);
    localStorage.setItem("theme", isChecked);
    if (isChecked) {
      document.body.setAttribute("data-theme", "dark");
    } else {
      document.body.setAttribute("data-theme", "light");
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="switchWrapper">
        <h3>Theme:</h3>
        <SwitchButton checked={isDark} onChange={handleChange} />
      </div>
    </>
  );
};

export default Settings;
