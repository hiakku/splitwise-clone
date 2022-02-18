import { useCallback, useEffect, useState } from "react";
import ListingTable from "./components/ListingTable/ListingTable";
import Navbar from "../../components/Navbar/Navbar";
import AddExpenseModal from "./components/AddExpenseModal/AddExpenseModal";
import "./Homescreen.css";
const Homescreen = () => {
  const [expenseData, setExpenseData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const isDarkTheme =
      localStorage.getItem("theme")?.toString() === "true" ? true : false;
    if (isDarkTheme) {
      document.body.setAttribute("data-theme", "dark");
    } else {
      document.body.setAttribute("data-theme", "light");
    }
  }, []);
  useEffect(() => {
    const expenseDetails =
      JSON.parse(localStorage.getItem("expenseDetails")) || [];
    if (expenseDetails.length === 0) {
      localStorage.setItem(
        "expenseDetails",
        JSON.stringify([...expenseDetails])
      );
    }
    if (expenseData.length === 0) {
      setExpenseData(expenseDetails);
    }
  }, [expenseData.length]);
  const handleOpenModal = useCallback(() => {
    document.body.style.overflow = "hidden";
    setIsOpen(true);
  }, []);
  const handleCloseModal = useCallback(() => {
    document.body.style.overflow = "unset";
    setIsOpen(false);
    const expenseDetails =
      JSON.parse(localStorage.getItem("expenseDetails")) || [];
    setExpenseData(expenseDetails);
  }, []);
  return (
    <>
      <Navbar />
      <div className="homeScreenWrapper">
        <div className="leftDashboard">
          <a href="/settings">Settings</a>
        </div>
        <div className="innerDashboard">
          <div className="innerDashboardHeader">
            <p className="dashboardHeading">Dashboard</p>
            <button className="expenseButton" onClick={handleOpenModal}>
              Add an expense
            </button>
          </div>
          <div className="dashboardContent">
            <img src="/manIcon.png" alt="icon" />
            <div className="descriptionContent">
              <h1>Welcome to Splitwise!</h1>
              <p>Splitwise helps you split bills with friends.</p>
              {expenseData?.length > 0 && (
                <div className="expenseContainer">
                  <ListingTable expensesData={expenseData} />
                </div>
              )}
            </div>
          </div>
        </div>
        {isOpen && <AddExpenseModal handleCloseModal={handleCloseModal} />}
      </div>
    </>
  );
};
export default Homescreen;
