import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { selectLists } from '../redux/wordListsSlice';
import WordsListPage from './WordsListPage';
import { WordLists } from '../components/WordLists';
import { useAppDispatch } from '../redux/hooks';
import { selectUser } from '../redux/authSlice';
import { useEffect } from 'react';
import { addSenseToWordlistsAction, deleteWordlistsAction, fetchWordlistsByUserIdAction, postWordlistsAction } from '../redux/wordListsActions';

const ListsPage = () => {
  const { id } = useParams<{ id: string }>();
  if (id) {
    return (
      <WordsListPage></WordsListPage>
    );
  }

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

export default ListsPage;
