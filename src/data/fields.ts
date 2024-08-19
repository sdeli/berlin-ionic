import { useFormInput } from './utils';

type InputProps = {
  type: string;
  placeholder: string;
};

type InputState = ReturnType<typeof useFormInput>; // Assuming useFormInput returns an object or function

type Input = {
  props: InputProps;
  state: InputState;
};

export type FormField = {
  id: string;
  label: string;
  required: boolean;
  input: Input;
};

export const useSignupFields = (): FormField[] => {

  return [
    {
      id: "name",
      label: "Name",
      required: true,
      input: {

        props: {

          type: "text",
          placeholder: "Joe Bloggs"
        },
        state: useFormInput("")
      }
    },
    {
      id: "email",
      label: "Email",
      required: true,
      input: {

        props: {

          type: "email",
          placeholder: "joe@bloggs.com"
        },
        state: useFormInput("")
      }
    },
    {
      id: "password",
      label: "Password",
      required: true,
      input: {

        props: {

          type: "password",
          placeholder: "*********"
        },
        state: useFormInput("")
      }
    }
  ];
}

export const useLoginFields = (): FormField[] => {

  return [

    {
      id: "email",
      label: "Email",
      required: true,
      input: {

        props: {
          type: "email",
          placeholder: "joe@bloggs.com"
        },
        state: useFormInput("")
      }
    },
    {
      id: "password",
      label: "Password",
      required: true,
      input: {

        props: {
          type: "password",
          placeholder: "*******"
        },
        state: useFormInput("")
      }
    }
  ];
}