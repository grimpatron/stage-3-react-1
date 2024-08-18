// src/redux/formSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FormInterface {
  termsAccepted?: boolean;
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  picture: string;
  country: string;
  target?: EventTarget;
  password1?: string;
  password2?: string;
  validationError?: string;
}

const formSlice = createSlice({
  name: 'form',
  initialState: {
    name: '',
    age: 0,
    email: '',
    password1: '',
    password2: '',
    gender: '',
    termsAccepted: false,
    picture: '',
    country: '',
  } as FormInterface,
  reducers: {
    updateField: (state, action: PayloadAction<{ field: keyof FormInterface; value: string }>) => {
      const { field, value } = action.payload;
      switch (field) {
        case 'name':
          state.name = value;
          break;
        case 'age':
          state.age = parseInt(value, 10); // Convert string to number
          break;
        case 'email':
          state.email = value;
          break;
        case 'password1':
          state.password1 = value;
          break;
        case 'password2':
          state.password2 = value;
          break;
        case 'gender':
          state.gender = value;
          break;
        case 'termsAccepted':
          state.termsAccepted = value === 'true'; // Convert string to boolean
          break;
        case 'picture':
          state.picture = value;
          break;
        case 'country':
          state.country = value;
          break;
        default:
          break;
      }
    },
  },
});

export const { updateField } = formSlice.actions;
export default formSlice.reducer;
