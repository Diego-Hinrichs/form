import { useFormContext } from "react-hook-form";

const RadioButton = ({ field, options }) => {
    const { setValue } = useFormContext();
    const handleClick = (e) => {
        const value = e.target.value;
        setValue(field, value)
    }
    return (
        <div>
            {options.map((option) => (
                <div>
                    <label>
                        <input 
                            type="radio"
                            value={option} 
                            onClick={handleClick}
                            name={field}
                            required
                            />
                        {option}
                    </label>
                </div>
            ))}
        </div>
    )
}
export default RadioButton;