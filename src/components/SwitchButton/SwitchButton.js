import { useCallback } from "react";
import "./SwitchButton.css";
const SwitchButton = (props) => {
  const { checked, onChange } = props;
  const handleChange = useCallback(
    (e) => {
      onChange(e.target.checked);
    },
    [onChange]
  );

  return (
    <input
      className="switchButton"
      type="checkbox"
      checked={checked}
      onChange={(e) => {
        handleChange(e);
      }}
    />
  );
};
export default SwitchButton;
