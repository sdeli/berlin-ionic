import { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { deleteWordList, fetchAllWordLists, fetchWordListsByuserId, postWordList } from '../api/wordListsApi';
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

export const fetchWordlistsByUserIdAction = (userId: string): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
  console.log('fetchWordlistsByUserIdAction')
  try {
    const wordsLists = await fetchWordListsByuserId(userId)
    dispatch(wordListsSlice.actions.replace(wordsLists))
  } catch (error) {
    console.log('error')
    console.log(error)
    console.log('busted')
  }
}


export const deleteWordlistsAction = (wordListId: string): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
  try {
    await deleteWordList(wordListId);
    dispatch(wordListsSlice.actions.delete({ wordListId }))
  } catch (error) {
    console.log('error')
    console.log(error)
    console.log('busted')
  }
}