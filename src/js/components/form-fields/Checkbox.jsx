const Checkbox = ({ id, label, value, checked, onChange, disabled }) => {
    console.log(checked);
    return (
        <div className="wpwax-vm-checkbox">
            <input 
                id={id} 
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