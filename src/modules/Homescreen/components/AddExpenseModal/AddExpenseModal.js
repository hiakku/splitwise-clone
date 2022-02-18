import { useCallback, useEffect, useState } from "react";
import Modal from "../../../../components/Modal/Modal";
import MultiSelectInput from "../../../../components/MultiSelectInput/MultiSelectInput";
import "./AddExpenseModal.css";
const AddExpenseModal = (props) => {
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
        const isItemNotFoundinFriends =
          friends
            .map((itemVal) => itemVal.toLowerCase())
            .indexOf(friendNameEmail.toLowerCase()) === -1;
        const isItemNotFoundFriendList =
          friendsDropdownData
            .map((itemVal) => itemVal.toLowerCase())
            .indexOf(friendNameEmail.toLowerCase()) === -1;
        if (isItemNotFoundinFriends) {
          setErrorMessage("");
          setFriends((friendsList) => [...friendsList, friendNameEmail]);
          setEnteredFriendName("");
          isItemNotFoundFriendList &&
            localStorage.setItem(
              "friendList",
              JSON.stringify([...friendsDropdownData, friendNameEmail])
            );
          isItemNotFoundFriendList &&
            setFriendsDropdownData([...friendsDropdownData, friendNameEmail]);
        } else {
          setErrorMessage("Entered value already exists!");
        }
      } else {
        setErrorMessage("Please enter some value to add.");
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
    if (
      friends.length === 0 ||
      description.length === 0 ||
      price.length === 0
    ) {
      setErrorMessage(
        "Enter the friends details/description/ price for the expense."
      );
    } else {
      setErrorMessage("");
      const expenseDetails =
        JSON.parse(localStorage.getItem("expenseDetails")) || [];
      friends.unshift("You");
      const friendsAdded = friends.map((item) => {
        return {
          name: item,
          owedAmount: (price / friends.length).toFixed(2),
        };
      });
      localStorage.setItem(
        "expenseDetails",
        JSON.stringify([
          ...expenseDetails,
          { description: description, friendsAdded: friendsAdded },
        ])
      );
      handleCloseModal();
    }
  }, [friends, description, price, handleCloseModal]);
  return (
    <Modal
      handleCloseModal={handleCloseModal}
      modalTitle="Add an expense"
      handleSave={handleSave}
    >
      <>
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
      </>
    </Modal>
  );
};
export default AddExpenseModal;
