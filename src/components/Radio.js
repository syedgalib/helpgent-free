const Radio = ({ id, name, label, value, onChange }) => {
    return (
        <div className="wpwax-vm-checkbox">
            <input 
                id={id} 
                name={name} 
                type="radio" 
                value={value}
                onChange={onChange}
            />
            <label htmlFor={id}>{label}</label>
        </div>
    );
};
  
export default Radio;