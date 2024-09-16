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
import { useEffect } from 'react';
import { AddSenseToWordlistsDto, SenseLineDTO, SenseListDto } from '../dto';
import { useSelector } from 'react-redux';
import { selectLists } from '../redux/wordListsSlice';
import { selectUser } from '../redux/authSlice';
import { useAppDispatch } from '../redux/hooks';
import { addSenseToWordlistsAction, deleteWordlistsAction, fetchWordlistsByUserIdAction, postWordlistsAction, setActiveListIdAction, updateListAction } from '../redux/wordListsActions';
import { WordLists } from './WordLists';

interface AddSenseLineToListModalProps {
  isOpen: boolean;
  onClose: () => void;
  line: SenseLineDTO;
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
    dispatch(deleteWordlistsAction(listId));
  }

  const addSenseToWordlist = (listId: string) => {
    const dto: AddSenseToWordlistsDto = {
      listId,
      lineId: line.ID
    }
    dispatch(addSenseToWordlistsAction(dto));
  }

  const updateListName = (newName: string, listId: string) => {
    const listToUpdate = wordLists.find((list) => list.ID === listId);
    if (!listToUpdate) return;

    const tempList: SenseListDto = {
      ...listToUpdate,
      title: newName
    }
    dispatch(updateListAction(tempList));
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
        <div style={{ paddingLeft: '50px', marginBottom: '-10px' }}>
          <p>german: {line.source.text}</p>
          <p>english: {line.target.text}</p>
        </div>

        <WordLists
          wordLists={wordLists}
          onAddNewList={addList}
          onDeleteList={deleteList}
          onAddSenseToWordlist={addSenseToWordlist}
          onUpdateListName={updateListName}
          displayAddWordBtn={true}
        ></WordLists>
      </IonModal>
    </div >
  )
}