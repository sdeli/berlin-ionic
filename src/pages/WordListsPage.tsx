import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectLists } from '../redux/wordListsSlice';
import { selectUser } from '../redux/authSlice';
import { useAppDispatch } from '../redux/hooks';
import { addSenseToWordlistsAction, deleteWordlistsAction, fetchWordlistsByUserIdAction, postWordlistsAction, setActiveListIdAction } from '../redux/wordListsActions';
import { WordLists } from '../components/WordLists';

export const WordListPage = () => {
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user) {
      dispatch(fetchWordlistsByUserIdAction(user.id));
    }
  }, [dispatch, user]);


  const wordLists = useSelector(selectLists);

  function addList(newWordListName: string) {
    if (!user) return;
    dispatch(postWordlistsAction(newWordListName, user.id, wordLists));
  }

  const deleteList = (listId: string) => {
    dispatch(deleteWordlistsAction(listId));
  }

  const addSenseToWordlist = (lineId: string, listId: string) => {
    dispatch(addSenseToWordlistsAction(lineId, listId));
  }

  return (
    <WordLists 
    wordLists={wordLists} 
    line={null} 
    onAddNewList={addList} 
    onDeleteList={deleteList} 
    onAddSenseToWordlist={addSenseToWordlist}
  ></WordLists>
  );
}