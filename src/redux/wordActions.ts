import { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { fetchAllWords, fetchWord } from '../api/wordApi';
import { wordSlice } from './wordSlice';
import { addWordToSearchHistory } from '../api/wordListsApi';

export const fetchWordsAction = (searchedWord?: string): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
  searchedWord = searchedWord || '';
  try {
    const words = await fetchAllWords({ text: searchedWord, limit: 10 });
    dispatch(wordSlice.actions.replace(words));
  } catch (error) {
    console.log('error')
    console.log(error)
  }
}

export const clearWordsAction = (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
  try {
    dispatch(wordSlice.actions.clearWords());
  } catch (error) {
    console.log('error')
    console.log(error)
  }
}
export const clearChosenWordAction = (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
  try {
    dispatch(wordSlice.actions.clearChosenWord());
  } catch (error) {
    console.log('error')
    console.log(error)
  }
}

export const fetchChosenWordAction = (searchedWord: string, userId: string | null = null): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
  searchedWord = searchedWord || '';
  const filter = { text: searchedWord, limit: 1 }
  dispatch(wordSlice.actions.setChosenWordIsLoading(true))
  try {
    const word = await fetchWord(filter);
    dispatch(wordSlice.actions.setChosenWord(word))
    dispatch(wordSlice.actions.setChosenWordIsLoading(false))
    if (userId) {
      await addWordToSearchHistory(word.ID, userId)
    }
    return true;
  } catch (error) {
    dispatch(wordSlice.actions.setChosenWordIsLoading(false))
    console.log('error')
    console.log(error)
    return false
  }
}