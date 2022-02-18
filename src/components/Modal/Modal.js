import "./Modal.css";
const Modal = (props) => {
  const { handleCloseModal, children, handleSave, modalTitle } = props;
  return (
    <div className="modalWrapper">
      <div className="modalBackground" />
      <div className="modalContent">
        <header>
          {modalTitle} <span onClick={handleCloseModal}>x</span>
        </header>
        <section>{children}</section>
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
