import { ThunkAction } from 'redux-thunk';
import { RootState } from './store';
import { AnyAction } from 'redux';
import { appSlice } from './appSlice';

const appReducers = appSlice.actions;

export const setIsloadingAction = (isLoading: boolean): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
  try {
    dispatch(appReducers.setIsLoading(isLoading))
  } catch (error) {
    console.log(error)
  }
}