import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ id, name, label, value, checked, onChange, disabled, currentCheckboxId, loader }) => {

    return (
        <div className="wpwax-vm-checkbox">
            {
                currentCheckboxId === id && loader ? <span className='wpwax-vm-circle-loader'></span> 
                :
                <input 
                    id={id}
                    name={name}
                    type="checkbox"
                    value={value}
                    checked={checked} 
                    onChange={onChange}
                    disabled={disabled ? "disabled": ""}
                />
            }
            
            <label htmlFor={id}>{label}</label>
        </div>
    );
};

// Specifies the default values for props:
Checkbox.defaultProps = {
    id                 :"",
    name               :"",
    label              :"Helpgent Checkbox",
    value              :"",
    checked            :false,
    disabled           :false,
    currentCheckboxId  :"",
    loader             :false,
};

// Specifies the prop Types:
Checkbox.propTypes = {
    id                 :PropTypes.string,
    name               :PropTypes.string,
    label              :PropTypes.string,
    value              :PropTypes.string,
    checked            :PropTypes.bool,
    onChange           :PropTypes.func,
    disabled           :PropTypes.bool,
    currentCheckboxId  :PropTypes.string,
    loader             :PropTypes.bool,
};
  
export default Checkbox;