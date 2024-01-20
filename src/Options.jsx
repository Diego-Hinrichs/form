import { useFormContext } from "react-hook-form";
import { useState } from "react";
const Options = ({ field, options, enableAnother, placeholder }) => {
    const { setValue } = useFormContext();
    const [selectedOption, setSelectedOption] = useState("");

    const handleOptionChange = (event) => {
        const value = event.target.value;
        setSelectedOption(value);
        setValue(field, value);
    };

    const handleOtherChange = (event) => {
        const value = event.target.value;
        setValue(field, value);
    };

    return (
        <div>
            {options.map((option, index) => (
                <label key={option}>
                    <input
                        type='radio'
                        value={option}
                        onClick={handleOptionChange}
                        name={field}
                        required
                    />
                    {option === "Otro" && enableAnother && (
                        <input
                            type='text'
                            placeholder={placeholder}
                            onChange={handleOtherChange}
                            disabled={!(selectedOption === "Otro")}
                            required
                        />
                    )}
                    {(option !== "Otro" && (option))}
                </label>
            ))}
        </div>
    );
};

export default Options;
