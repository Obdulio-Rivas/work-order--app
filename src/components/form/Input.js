import React from 'react'

export const Input = (props) => {

    const {label, type, name, value, pattern, disabled, placeholder, handlerInputChange} = props;

    return (
        <div className={'containerInput'}>
          <label htmlFor={name}>{label}</label>
          <input
            type={type}
            name={name}
            value={value}
            pattern={pattern}
            className={'form-control'}
            disabled={disabled}
            placeholder={placeholder}
            onChange={handlerInputChange}
          />
        </div>
    )
}
