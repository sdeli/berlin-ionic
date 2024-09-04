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
import { SenseLineDTO, SenseListDto } from '../dto';
import { useSelector } from 'react-redux';
import { selectLists } from '../redux/wordListsSlice';
import { selectUser } from '../redux/authSlice';
import { useAppDispatch } from '../redux/hooks';
import { addSenseToWordlistsAction, deleteWordlistsAction, fetchWordlistsByUserIdAction, postWordlistsAction, setActiveListIdAction } from '../redux/wordListsActions';
import WordListLocalMenu from './WordListLocalMenu';
import { useHistory } from 'react-router-dom';

interface WordListsProps {
  wordLists: SenseListDto[]
  line: SenseLineDTO | null
  onAddNewList: (newWordListName: string) => void,
  onDeleteList: (listId: string) => void,
  onAddSenseToWordlist: (listId: string, lineId: string) => void,
}
export const WordLists = ({ wordLists, onAddNewList, line, onAddSenseToWordlist, onDeleteList }: WordListsProps) => {
  const dispatch = useAppDispatch();
  const navigate = useHistory();
  const [newWordList, setNewWordList] = useState('');

  function addListEv() {
    onAddNewList(newWordList);
    setNewWordList('')
  }

  const wordlists = wordLists.map((list) => {
    const editList = () => {
      console.log(list.ID);
    }

    const deleteListEv = (listId: string) => {
      onDeleteList(listId);
    }

    const navigateToList = (listId: string) => {
      dispatch(setActiveListIdAction(listId));
      navigate.push(`/dic/list/${listId}`);
    }

    const addSenseToWordlistsEv = (e: React.MouseEvent<HTMLIonButtonElement, MouseEvent>, listId: string, lineId: string) => {
      e.stopPropagation();
      e.preventDefault();
      console.log('addSenseToWordlistsEv')
      console.log(listId);
      onAddSenseToWordlist(listId, lineId);
    }

    return (
      <div key={list.ID} style={{position: 'relative', }}>
        <IonItem button={true} onClick={() => {navigateToList(list.ID)}}>
          <IonLabel>{list.title}</IonLabel>
          <IonNote slot="end">6</IonNote>
          {!!line && 
            <div style={{
                position: 'absolute',
                top: '5px',
                right: '63px',
              }}>
              <IonButton size="small" onClick={(e) => {
                if (!line) return;
                addSenseToWordlistsEv(e, list.ID, line.ID)
              }}>add word</IonButton>
            </div>
          }
        </IonItem>

        <div style={{
            position: 'absolute',
            top: '6px',
            right: '11px',
          }}>
          <WordListLocalMenu 
            onDelete={() => {deleteListEv(list.ID)}} 
            onEdit={editList}>
          </WordListLocalMenu>
        </div>
      </div>
    )
  })

  return (
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
          <IonButton disabled={!newWordList} onClick={addListEv}>Add new list</IonButton>
        </IonItem>
      </div>

      <IonList style={{height: '100%'}} inset={true}>
        {wordlists}
      </IonList>
    </IonContent>
  )
}