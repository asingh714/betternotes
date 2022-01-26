import { BsSearch } from "react-icons/bs";

import "./SearchBar.styles.scss";

function Searchbar({
  name,
  handleChange,
  placeholder,
  type,
  value,
  inputStyle,
  accept,
  handleSubmit,
}) {
  return (
    <input
      name={name}
      onChange={handleChange}
      placeholder={placeholder}
      type={type}
      value={value}
      className={inputStyle}
      accept={accept}
      onSubmit={handleSubmit}
    />
  );
}

export default Searchbar;
