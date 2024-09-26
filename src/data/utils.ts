import { useState } from "react";
import { DefaultListNamesDto, SenseListDto } from '../dto';

// Hook: useFormInput
export interface UseFormInputReturn {
  value: string;
  reset: (newValue: string) => void;
  onIonChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyUp: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export interface ValidationError {
  id: string;
  message: string;
};

export const useFormInput = (initialValue: string = ""): UseFormInputReturn => {
  const [value, setValue] = useState<string>(initialValue);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>) => {
    const tempValue = e.currentTarget.value;
    setValue(tempValue);
  };

  return {
    value,
    reset: (newValue: string) => setValue(newValue),
    onIonChange: handleChange,
    onKeyUp: handleChange,
  };
};

// Function: validateForm
export interface LoginFormField {
  id: string;
  label: string;
  required: boolean;
  input: {
    state: {
      value: string;
      reset: (newValue: string) => void;
      onIonChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
      onKeyUp: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    };
  };
};

export const validateForm = (fields: LoginFormField[]): ValidationError[] => {
  let errors: ValidationError[] = [];

  fields.forEach((field) => {
    if (field.required) {
      const fieldValue = field.input.state.value;

      if (fieldValue === "") {
        const error: ValidationError = {
          id: field.id,
          message: `Please check your ${field.id}`,
        };
        errors.push(error);
      }
    }
  });

  return errors;
};

export function isStringArray(something: any): string[] | false {
  if (Array.isArray(something) && something.every(item => typeof item === 'string')) {
    return something
  } else {
    return false;
  }
}

export function moveToFrontByTitle(arr: SenseListDto[], value: DefaultListNamesDto): SenseListDto[] {
  const defaultItems = arr.filter(item =>
    item.title === value
  );

  const remainingItems = arr.filter(item =>
    item.title !== value
  );

  return [...defaultItems, ...remainingItems];
}

export const isUUID = (str: string) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
};