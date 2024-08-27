import axios from 'axios';
import { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { fetchAllWords, fetchWord } from '../api/wordApi';
import { wordSlice } from './wordSlice';

interface WordFilter {
  text: string,
  limit: number
}

export const fetchWordsAction = (searchedWord?: string): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
  searchedWord = searchedWord || '';
  try {
    const words = await fetchAllWords({ text: searchedWord, limit: 10 });
    dispatch(wordSlice.actions.replace(words))
  } catch (error) {
    console.log('error')
    console.log(error)
    console.log('busted')
  }
}

export const fetchChosenWordAction = (searchedWord?: string): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
  searchedWord = searchedWord || '';
  const filter = { text: searchedWord, limit: 1 }
  try {
    const word = await fetchWord(filter);
    dispatch(wordSlice.actions.setChosenWord(word))
  } catch (error) {
    console.log('error')
    console.log(error)
    console.log('busted')
  }
}