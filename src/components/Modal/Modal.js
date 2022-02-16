import { useCallback, useEffect, useState } from "react";
import MultiSelectInput from "../MultiSelectInput/MultiSelectInput";
import "./Modal.css";
const Modal = (props) => {
  const { handleCloseModal } = props;
  const [friends, setFriends] = useState([]);
  const [enteredFriendName, setEnteredFriendName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [friendsDropdownData, setFriendsDropdownData] = useState([]);
  const [filteredFriendsData, setFilteredFriendsData] = useState([]);
  const handleSearch = useCallback(
    (e) => {
      const filteredData = [...friendsDropdownData].filter((item) =>
        item.toLowerCase().includes(e.currentTarget.value.toLowerCase())
      );
      setFilteredFriendsData(filteredData);
    },
    [friendsDropdownData]
  );
  const handleInputChange = useCallback((e, callbackFunc) => {
    setErrorMessage("");
    callbackFunc(e.currentTarget.value);
  }, []);
  useEffect(() => {
    const friendData = JSON.parse(localStorage.getItem("friendList")) || [];
    setFriendsDropdownData(friendData);
  }, []);
  const handleAddFriend = useCallback(
    (friendNameEmail) => {
      if (friendNameEmail.length > 0) {
        if (friends.indexOf(friendNameEmail) === -1) {
          setErrorMessage("");
          setFriends((friendsList) => [...friendsList, friendNameEmail]);
          setEnteredFriendName("");
          if (friendsDropdownData.indexOf(friendNameEmail) === -1) {
            localStorage.setItem(
              "friendList",
              JSON.stringify([...friendsDropdownData, friendNameEmail])
            );
            setFriendsDropdownData([...friendsDropdownData, friendNameEmail]);
          }
        } else {
          setErrorMessage("Entered value already exists!");
        }
      } else {
        setErrorMessage("Please give at least one name");
      }
    },
    [friends, friendsDropdownData]
  );
  const handleDelete = useCallback(
    (friendName) => {
      const filteredData = [...friends].filter((item) => item !== friendName);
      setFriends(filteredData);
    },
    [friends]
  );
  const handleSave = useCallback(() => {
    if (friends.length === 0) {
      setErrorMessage(
        "There is only one person involved in this expense. Do you still want to save it?"
      );
    }
    if (description.length === 0 || price.length === 0) {
      setErrorMessage("Enter description/ price for the expense.");
    }
    if ((friends.length > 0 && description.length > 0, price.length > 0)) {
      setErrorMessage("");
      const initialExpenses = {
        youOwe: (price / (friends.length + 1)).toFixed(2),
        youAreOwed: (price / (friends.length + 1)).toFixed(2),
      };
      localStorage.setItem("expenseDetails", JSON.stringify([initialExpenses]));
      handleCloseModal();
    }
  }, [friends.length, description.length, price, handleCloseModal]);

  return (
    <div className="modalWrapper">
      <div className="modalBackground" />
      <div className="modalContent">
        <header>
          Add an expense <span onClick={handleCloseModal}>x</span>
        </header>
        <section>
          <MultiSelectInput
            friends={friends}
            handleDelete={handleDelete}
            enteredFriendName={enteredFriendName}
            handleSearch={handleSearch}
            handleInputChange={handleInputChange}
            handleAddFriend={handleAddFriend}
            setEnteredFriendName={setEnteredFriendName}
            filteredFriendsData={filteredFriendsData}
          />
          {friends.length > 0 && (
            <div className="expenseDetailBox">
              <input
                type="text"
                className="dottedInputBox"
                placeholder="Enter a description"
                value={description}
                onChange={(e) => handleInputChange(e, setDescription)}
              />
              <div className="priceInput">
                <span className="dollar">$</span>
                <input
                  type="text"
                  className="dottedInputBox priceValue"
                  placeholder="0.00"
                  value={price}
                  onInput={(e) =>
                    setPrice(
                      e.currentTarget.value
                        .replace(/[^0-9.]/g, "")
                        .replace(/(\..*)\./g, "$1")
                    )
                  }
                />
              </div>
              <p>Expenses are equally divided</p>
            </div>
          )}
          {errorMessage && <div className="errorMessage">{errorMessage}</div>}
        </section>
        <footer>
          <button className="cancelButton" onClick={handleCloseModal}>
            Cancel
          </button>
          <button className="saveButton" onClick={handleSave}>
            Save
          </button>
        </footer>
      </div>
    </div>
  );
};
export default Modal;
