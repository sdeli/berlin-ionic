import { ThunkAction } from 'redux-thunk';
import { RootState } from './store';
import { AnyAction } from 'redux';
import { postLoginData } from '../api/authApi';
import { authSlice } from './authSlice';
import { LoginDto } from '../dto';
import * as H from 'history';

const authReducers = authSlice.actions;

// Define the async thunk for user registration
export const loginUserAction = (user: LoginDto, navigate: H.History): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
  try {
    const loggedInUserData = await postLoginData(user);
    dispatch(authReducers.login(loggedInUserData))
    navigate.push('/dic')
  } catch (error) {
    console.log('rejected')
  }
}

export const registerUserAction = (user: LoginDto, navigate: H.History): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
  try {
    await postLoginData(user, true);
    console.log('nav')
    navigate.push('/login');
    console.log('postLoginData')
    // console.log(postLoginData)
  } catch (error) {
    console.log('error')
    console.log(error)

    console.log('rejected')
  }
}