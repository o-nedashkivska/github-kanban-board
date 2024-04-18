import { useState } from "react";

const useInput = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue);
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const error = isTouched && !isValid;

  const handleChange = (e) => {
    const newValue = e.target.value;

    setValue(e.target.value);
    setIsValid(validator(newValue));
  };

  const handleBlur = () => {
    setIsTouched(true);
  };

  return {
    value,
    error,
    isValid,
    isTouched,
    onChange: handleChange,
    onBlur: handleBlur,
  };
};

export default useInput;
