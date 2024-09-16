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
import { AddSenseToWordlistsDto, SenseLineDTO, SenseListDto } from '../dto';
import { useSelector } from 'react-redux';
import { selectLists } from '../redux/wordListsSlice';
import { selectUser } from '../redux/authSlice';
import { useAppDispatch } from '../redux/hooks';
import { addSenseToWordlistsAction, deleteWordlistsAction, fetchWordlistsByUserIdAction, postWordlistsAction, setActiveListIdAction } from '../redux/wordListsActions';
import WordListLocalMenu from './WordListLocalMenu';
import { useHistory } from 'react-router-dom';
import WordListItem from './WordListsItem';

interface WordListsProps {
  wordLists: SenseListDto[]
  onAddNewList: (newWordListName: string) => void,
  onDeleteList: (listId: string) => void,
  onAddSenseToWordlist: (listId: string) => void,
  onUpdateListName: (newName: string, id: string) => void;
}
export const WordLists = ({ wordLists, onAddNewList, onAddSenseToWordlist, onDeleteList, onUpdateListName }: WordListsProps) => {
  const dispatch = useAppDispatch();
  const navigate = useHistory();
  const [newWordList, setNewWordList] = useState('');

  function addListEv() {
    onAddNewList(newWordList);
    setNewWordList('')
  }

  const navigateToList = (listId: string) => {
    dispatch(setActiveListIdAction(listId));
    navigate.push(`/dic/list/${listId}`);
  }

  const updateListName = (name: string, listId: string) => {
    onUpdateListName(name, listId);
  }

  const wordlists = wordLists.map((list) =>
    <WordListItem
      key={list.ID}
      list={list}
      onDeleteList={onDeleteList}
      onAddSenseToWordlist={onAddSenseToWordlist}
      navigateToList={navigateToList}
      onUpdateListName={(newName) => { updateListName(newName, list.ID) }}
    />
  )

  return (
    <IonContent className="ion-padding">
      <div title="add-new-list-area" style={{ padding: "0 17px" }}>
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

      <IonList style={{ height: '100%' }} inset={true}>
        {wordlists}
      </IonList>
    </IonContent>
  )
}