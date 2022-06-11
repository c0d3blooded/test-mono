import React, { createContext } from 'react';

type SignUpContextType = {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  onNextStep: () => void; // continue to the next step
  onFormStateValidated: (index: number, isValid: boolean) => void; // when the form state updates
};

export const SignUpContext = createContext<SignUpContextType>({
  step: 0,
  setStep: () => {},
  onNextStep: () => {},
  onFormStateValidated: () => {}
});
