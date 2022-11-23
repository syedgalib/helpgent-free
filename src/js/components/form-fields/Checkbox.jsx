const Checkbox = ({ id, name, label, value, checked, onChange, disabled }) => {
    return (
        <div className="wpwax-vm-checkbox">
            <input 
                id={id} 
                name={name}
                type="checkbox"
                value={value}
                checked={checked} 
                onChange={onChange}
                disabled={disabled ? "disabled": ""}
            />
            <label htmlFor={id}>{label}</label>
        </div>
    );
};
  
export default Checkbox;