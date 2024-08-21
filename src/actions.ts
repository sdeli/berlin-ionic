import axios from 'axios';
import { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import { createQueryString } from './libs/utils';
import { RootState } from './redux/store';
import { WordDTO } from './dto';
import { wordSlice } from './redux/wordSlice';

interface WordFilter {
  text: string,
  limit: number
}

async function fetchAllWords(filter?: WordFilter) {
  const url = filter ? `http://localhost:3000/word?${createQueryString(filter)}` : 'http://localhost:3000/word';
  console.log('url')
  console.log(url);
  const response = await axios.get<WordDTO[]>(url)
  const words = response.data;
  return words;
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