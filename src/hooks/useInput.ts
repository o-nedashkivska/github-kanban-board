import { ChangeEvent, useState } from "react";

type ValidatorFn = (string) => boolean;

interface UseInputReturn {
  value: string;
  error: boolean;
  isValid: boolean;
  isTouched: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
}

const useInput = (
  initialValue: string,
  validator: ValidatorFn
): UseInputReturn => {
  const [value, setValue] = useState(initialValue);
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const error = isTouched && !isValid;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
