import "./SensesTable.scss";

import {
  IonButton,
  IonContent,
  IonItem,
  IonInput,
  IonList,
} from '@ionic/react';
import { useState } from 'react';
import { DefaultListNamesDto, SenseListDto } from '../dto';
import { useAppDispatch } from '../redux/hooks';
import { setActiveListIdAction } from '../redux/wordListsActions';
import { useHistory } from 'react-router-dom';
import WordListItem from './WordListsItem';
import { moveToFrontByTitle } from '../data/utils';

interface WordListsProps {
  wordLists: SenseListDto[]
  displayAddWordBtn?: boolean,
  onAddNewList: (newWordListName: string) => Promise<boolean>,
  onDeleteList: (listId: string) => void,
  onAddSenseToWordlist: (listId: string) => void,
  onUpdateListName: (newName: string, id: string) => Promise<void>;
}
export const WordLists = ({ wordLists, displayAddWordBtn = false,
  onAddNewList, onAddSenseToWordlist, onDeleteList, onUpdateListName }: WordListsProps) => {
  const dispatch = useAppDispatch();
  const navigate = useHistory();
  const [newWordList, setNewWordList] = useState('');

  function addListEv() {
    onAddNewList(newWordList).then(() => {
      setNewWordList('')
    })
  }

  const navigateToList = (listId: string) => {
    dispatch(setActiveListIdAction(listId));
    navigate.push(`/dic/list/${listId}`);
  }

  const updateListName = (name: string, listId: string) => {
    return onUpdateListName(name, listId);
  }
  wordLists = wordLists.filter((wordList) => {
    if (wordList.title !== DefaultListNamesDto.YourWords) return true;
    const yourWordListShouldNotBeEmtpy = !!wordList.senseLines.length
    return yourWordListShouldNotBeEmtpy;
  })

  wordLists = moveToFrontByTitle(wordLists, DefaultListNamesDto.YourWords);
  wordLists = moveToFrontByTitle(wordLists, DefaultListNamesDto.SearchHistory);

  const wordlists = wordLists.map((list) =>
    <WordListItem
      key={list.ID}
      list={list}
      onDeleteList={onDeleteList}
      onAddSenseToWordlist={onAddSenseToWordlist}
      navigateToList={navigateToList}
      onUpdateListName={async (newName) => updateListName(newName, list.ID)}
      displayAddWordBtn={displayAddWordBtn}
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