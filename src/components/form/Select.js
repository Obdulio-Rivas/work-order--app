import React from "react";

export const Select = (props) => {
  const { label, name, defaultValue, defaultOption, handlerInputChange } =
    props;

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <select
        defaultValue={defaultValue}
        name={name}
        className={'form-control'}
        onChange={handlerInputChange}
      >
        <option disabled value={defaultValue}>{defaultOption}</option>
        {props.children}
      </select>
    </div>
  );
};
