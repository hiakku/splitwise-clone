import { useCallback } from "react";
import "./MultiSelectInput.css";
const MultiSelectInput = (props) => {
  const {
    friends,
    handleDelete,
    enteredFriendName,
    handleSearch,
    handleInputChange,
    handleAddFriend,
    setEnteredFriendName,
    filteredFriendsData,
  } = props;
  const handleChange = useCallback(
    (e) => {
      handleInputChange(e, setEnteredFriendName);
      handleSearch(e);
    },
    [handleInputChange, handleSearch, setEnteredFriendName]
  );
  return (
    <>
      <div className="inputSection">
        <label htmlFor="nameInput">With you and:</label>
        <ul className="listFriends">
          {friends.map((item, index) => (
            <li className="tags" key={`friends_${index}`}>
              <div className="tagText">{item}</div>
              <div className="close" onClick={() => handleDelete(item)}>
                x
              </div>
            </li>
          ))}
          <li className="inputBox">
            <input
              id="nameInput"
              type="text"
              name="nameInput"
              value={enteredFriendName}
              placeholder={
                (friends.length === 0 && "Enter name/ email address") || ""
              }
              onChange={handleChange}
            />
            <button
              className="addButton"
              onClick={() => handleAddFriend(enteredFriendName)}
            >
              +
            </button>
          </li>
        </ul>
      </div>
      {enteredFriendName.length > 0 && filteredFriendsData.length > 0 && (
        <ul className="dropDownFriends">
          {filteredFriendsData
            .filter(
              (friend) =>
                !friends
                  .map((itemVal) => itemVal.toLowerCase())
                  .includes(friend.toLowerCase())
            )
            .map((item, index) => (
              <li
                key={`friendslist${index}`}
                onClick={() => handleAddFriend(item)}
              >
                {item}
              </li>
            ))}
        </ul>
      )}
    </>
  );
};
export default MultiSelectInput;
