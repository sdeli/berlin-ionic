import "./SensesTable.scss";

import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonItem,
  IonInput,
  IonList,
  IonLabel,
  IonNote,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { SenseLineDTO } from '../dto';
import { useSelector } from 'react-redux';
import { selectLists } from '../redux/wordListsSlice';
import { selectUser } from '../redux/authSlice';
import { useAppDispatch } from '../redux/hooks';
import { deleteWordlistsAction, fetchWordlistsByUserIdAction, postWordlistsAction } from '../redux/wordListsActions';
import WordListLocalMenu from './WordListLocalMenu';
interface AddSenseLineToListModalProps {
  isOpen: boolean;
  onClose: () => void;
  line: SenseLineDTO | null;
}
export const AddSenseLineToListModal = ({ isOpen, onClose, line }: AddSenseLineToListModalProps) => {

  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user) {
      dispatch(fetchWordlistsByUserIdAction(user.id));
    }
  }, [dispatch, user]);


  const [newWordList, setNewWordList] = useState('');

  const wordLists = useSelector(selectLists);


  function addList() {
    if (!user) return;
    dispatch(postWordlistsAction(newWordList, user.id, wordLists));
    setNewWordList('')
  }

  const wordlists = wordLists.map((list) => {
    const editList = () => {
      console.log(list.ID);
      
    }
    
    const deleteList = () => {
      console.log(11);
      dispatch(deleteWordlistsAction(list.ID));
    }

    return (
      <div key={list.ID} style={{position: 'relative', }}>
        <IonItem button={true}>
          <IonLabel>{list.title}</IonLabel>
          <IonNote slot="end">6</IonNote>
        </IonItem>

        <div style={{
            position: 'absolute',
            top: '6px',
            right: '11px',
          }}>
          <WordListLocalMenu onDelete={deleteList} onEdit={editList}></WordListLocalMenu>
        </div>
      </div>
    )
  })

  return (
    <div className="container">
      <IonModal isOpen={isOpen} trigger="open-modal" onWillDismiss={onClose}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={onClose}>Cancel</IonButton>
            </IonButtons>

            <IonTitle>Welcome</IonTitle>

            <IonButtons slot="end">
              <IonButton strong={true} onClick={() => confirm()}>
                Confirm
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <div title="add-new-list-area" style={{ padding: "0 17px"}}>
            <IonItem>
              <IonInput
                label="Add new list"
                labelPlacement="stacked"
                type="text"
                placeholder="Add new list"
                value={newWordList}
                onIonInput={(e) => {
                  setNewWordList(e.detail.value || '')
                }}
              />
              <IonButton disabled={!newWordList} onClick={addList}>Add new list</IonButton>
            </IonItem>
          </div>

          <IonList style={{height: '100%'}} inset={true}>
            {wordlists}
          </IonList>
        </IonContent>
      </IonModal>
    </div>
  )
}