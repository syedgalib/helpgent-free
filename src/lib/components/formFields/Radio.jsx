const Radio = ({ id, name, label, value, onChange, checked }) => {
    return (
        <div className="wpwax-vm-radio">
            <input
                id={id}
                name={name}
                type="radio"
                value={value}
                onChange={onChange}
                checked={checked}
            />
            <label htmlFor={id}>{label}</label>
        </div>
    );
};

export default Radio;