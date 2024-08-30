import { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { fetchAllWordLists, postWordList } from '../api/wordListsApi';
import { selectLists, wordListsSlice } from './wordListsSlice';
import { useSelector } from 'react-redux';
import { SenseListDto } from '../dto';

export const fetchWordlistsAction = (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
  try {
    const wordsLists = await fetchAllWordLists();
    dispatch(wordListsSlice.actions.replace(wordsLists))
  } catch (error) {
    console.log('error')
    console.log(error)
    console.log('busted')
  }
}

export const postWordlistsAction = (wordListTitle: string, userid: string, wordLists: SenseListDto[]): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
  try {
    const newWordsList = await postWordList(wordListTitle, userid);
    dispatch(wordListsSlice.actions.replace([newWordsList, ...wordLists]))
  } catch (error) {
    console.log('error')
    console.log(error)
    console.log('busted')
  }
}