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
import { useState } from 'react';
import { SenseLineDTO } from '../dto';
import { useSelector } from 'react-redux';
import { selectLists } from '../redux/wordListsSlice';
import { selectUser } from '../redux/authSlice';
import { useAppDispatch } from '../redux/hooks';
import { postWordlistsAction } from '../redux/wordListsActions';
import WordListLocalMenu from './WordListLocalMenu';
interface AddSenseLineToListModalProps {
  isOpen: boolean;
  onClose: () => void;
  line: SenseLineDTO | null;
}
export const AddSenseLineToListModal = ({ isOpen, onClose, line }: AddSenseLineToListModalProps) => {
  const [newWordList, setNewWordList] = useState('');
  const [zIndex, setZIndex] = useState(600);
  const wordLists = useSelector(selectLists);
  const user = useSelector(selectUser);
  const dispatch = useAppDispatch();
  function addList() {
    if (!user) return;
    dispatch(postWordlistsAction(newWordList, user.id, wordLists));
  }

  const wordlists = wordLists.map((list) => {
    return (
      <div style={{position: 'relative', }}>
      <IonItem key={list.ID} button={true}>
        <IonLabel>{list.title}</IonLabel>
        <IonNote slot="end">6</IonNote>
      </IonItem>

      <div style={{
          position: 'absolute',
          top: '6px',
          right: '11px',
        }}>
        <WordListLocalMenu></WordListLocalMenu>
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
                onIonInput={(e) => setNewWordList(e.detail.value || '')}
              />
              <IonButton disabled={!newWordList} onClick={addList}>Add new list</IonButton>
            </IonItem>
          </div>

          <IonList inset={true}>
            {wordlists}
          </IonList>
        </IonContent>
      </IonModal>
    </div>
  )
}