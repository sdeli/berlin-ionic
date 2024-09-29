import { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { addWord, deleteWordByLine, fetchAllWords, fetchWord } from '../api/wordApi';
import { wordSlice } from './wordSlice';
import { addWordToSearchHistory } from '../api/wordListsApi';
import { AddWordDto, AddWordToSearchHistoryDto, deleteWordDto } from '../dto';
import { fetchWordlistsByUserIdAction } from './wordListsActions';
import { wordListsSlice } from './wordListsSlice';

export const fetchWordsAction = (userId: string, searchedWord?: string): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => async (dispatch) => {
  searchedWord = searchedWord || '';
  try {
    const words = await fetchAllWords({ text: searchedWord, limit: 10, userId });
    dispatch(wordSlice.actions.replace(words));
  } catch (error) {
    console.log('error')
    console.log(error)
  }
}

export const deleteWordByLineAction = (dto: deleteWordDto, listId: string): ThunkAction<Promise<boolean>, RootState, unknown, AnyAction> => async (dispatch) => {
  try {
    const wordId = await deleteWordByLine(dto);
    dispatch(wordSlice.actions.delete(wordId));
    dispatch(wordListsSlice.actions.deleteLine({ listId, lineId: dto.lineId }));
    return true;
  } catch (error) {
    console.log('error')
    console.log(error)
    return false;
  }
}

export const addWordAction = (dto: AddWordDto): ThunkAction<Promise<boolean>, RootState, unknown, AnyAction> => async (dispatch) => {
  try {
    await addWord(dto);
    if (dto.listIds.length) {
      dispatch(fetchWordlistsByUserIdAction(dto.userId))
    }
    return true;
  } catch (error) {
    console.log('error')
    console.log(error)
    return false
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

export const fetchChosenWordAction = (searchedWord: string, userId: string): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
  searchedWord = searchedWord || '';
  const filter = { text: searchedWord, limit: 1, userId }
  dispatch(wordSlice.actions.setChosenWordIsLoading(true))
  try {
    const word = await fetchWord(filter);
    dispatch(wordSlice.actions.setChosenWord(word))
    dispatch(wordSlice.actions.setChosenWordIsLoading(false))
    if (userId) {
      const dto: AddWordToSearchHistoryDto = {
        userId: userId,
        wordId: word.ID
      }
      await addWordToSearchHistory(dto)
    }
    return true;
  } catch (error) {
    dispatch(wordSlice.actions.setChosenWordIsLoading(false))
    console.log('error')
    console.log(error)
    return false
  }
}