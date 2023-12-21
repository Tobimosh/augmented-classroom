
import { FormData } from "../pages/Login";

export interface Action {
  type: 'SET_MATRIC_NUMBER' | 'SET_PASSWORD';
  payload: string;
}

export const loginReducer = (state: FormData, action: Action): FormData => {
  switch (action.type) {
    case 'SET_MATRIC_NUMBER':
      return { ...state, matric_number: action.payload };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    default:
      return state;
  }
};


