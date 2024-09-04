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
import { addSenseToWordlistsAction, deleteWordlistsAction, fetchWordlistsByUserIdAction, postWordlistsAction, setActiveListIdAction } from '../redux/wordListsActions';
import WordListLocalMenu from './WordListLocalMenu';
import { useHistory } from 'react-router-dom';
import { WordLists } from './WordLists';

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


  const wordLists = useSelector(selectLists);

  function addList(newWordListName: string) {
    if (!user) return;
    dispatch(postWordlistsAction(newWordListName, user.id, wordLists));
  }

  const deleteList = (listId: string) => {
    console.log(11);
    dispatch(deleteWordlistsAction(listId));
  }

  const addSenseToWordlist = (lineId: string, listId: string) => {
    dispatch(addSenseToWordlistsAction(lineId, listId));
  }

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
          <div style={{paddingLeft: '50px', marginBottom: '-10px'}}>
            <p>german: {line?.source.text}</p>
            <p>english: {line?.target.text}</p>
          </div>  

          <WordLists 
            wordLists={wordLists} 
            line={line} 
            onAddNewList={addList} 
            onDeleteList={deleteList} 
            onAddSenseToWordlist={addSenseToWordlist}
          ></WordLists>
      </IonModal>
    </div>
  )
}