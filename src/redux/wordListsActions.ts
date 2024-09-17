import { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { addSenseToWordlists, deleteWordList, fetchAllWordLists, fetchWordListsByuserId, postWordList, putWordList, removeSenseFromWordlist } from '../api/wordListsApi';
import { selectLists, wordListsSlice } from './wordListsSlice';
import { useSelector } from 'react-redux';
import { AddSenseToWordlistsDto, SenseListDto } from '../dto';

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

export const addSenseToWordlistsAction = (dto: AddSenseToWordlistsDto): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
  try {
    const list = await addSenseToWordlists(dto)
    dispatch(wordListsSlice.actions.replaceOne(list))
  } catch (error) {
    console.log('error')
    console.log(error)
    console.log('busted')
  }
}

export const removeSenseFromWordlistAction = (lineId: string, listId: string): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
  try {
    const list = await removeSenseFromWordlist(lineId, listId)
    dispatch(wordListsSlice.actions.replaceOne(list))
  } catch (error) {
    console.log('error')
    console.log(error)
    console.log('busted')
  }
}

export const setActiveListIdAction = (listId: string): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
  try {
    dispatch(wordListsSlice.actions.setActiveListId(listId))
  } catch (error) {
    console.log('error')
    console.log(error)
  }
}

export const updateListAction = (list: SenseListDto): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
  try {
    const updatedList = await putWordList(list);
    dispatch(wordListsSlice.actions.replaceOne(updatedList))
  } catch (error) {
    console.log('error')
    console.log(error)
    throw error;
  }
}