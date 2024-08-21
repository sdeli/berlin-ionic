import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import { RootState } from './store';
import { fetchAllWords } from '../api/wordApi';
import { wordSlice } from './wordSlice';


export const fetchWordsAction = (searchedWord?: string): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
  try {
    const words = await fetchAllWords(searchedWord);
    dispatch(wordSlice.actions.replace(words))
  } catch (error) {
    console.log('error')
    console.log(error)
    console.log('busted')
  }
}