import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectLists } from '../redux/wordListsSlice';
import { selectUser } from '../redux/authSlice';
import { useAppDispatch } from '../redux/hooks';
import { addSenseToWordlistsAction, deleteWordlistsAction, fetchWordlistsByUserIdAction, postWordlistsAction, setActiveListIdAction, updateListAction } from '../redux/wordListsActions';
import { WordLists } from '../components/WordLists';
import { AddSenseToWordlistsDto, SenseListDto } from '../dto';
import { MainLoader } from '../components/MainLoader';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/react';
import { personCircle, personCircleOutline } from 'ionicons/icons';

export const WordListPage = () => {
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user) {
      dispatch(fetchWordlistsByUserIdAction(user.id));
    }
  }, [dispatch, user]);


  const wordLists = useSelector(selectLists);

  async function addList(newWordListName: string): Promise<boolean> {
    if (!user) return false;

    return await dispatch(postWordlistsAction(newWordListName, user.id, wordLists));
  }

  const deleteList = (listId: string) => {
    dispatch(deleteWordlistsAction(listId));
  }

  const updateListName = async (newName: string, listId: string) => {
    const listToUpdate = wordLists.find((list) => list.ID === listId);
    if (!listToUpdate) return;

    const tempList: SenseListDto = {
      ...listToUpdate,
      title: newName
    }
    return dispatch(updateListAction(tempList));
  }

  return (
    <>
      <MainLoader></MainLoader>

      <IonHeader class="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton default-href="#"></IonBackButton>
          </IonButtons>
          <IonTitle>WordLists</IonTitle>
          <IonButtons slot="end">
            <IonButton color="dark">
              <IonIcon slot="icon-only" ios={personCircleOutline} md={personCircle}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <div style={{
        height: '2000px',
        maxWidth: '1000px',
        margin: 'auto'
      }}>
        <WordLists
          wordLists={wordLists}
          onAddNewList={addList}
          onDeleteList={deleteList}
          onAddSenseToWordlist={() => { }}
          onUpdateListName={updateListName}
        ></WordLists>
      </div>
    </>
  );
}