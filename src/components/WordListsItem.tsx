import React, { useEffect, useRef, useState } from 'react';
import {
  IonItem,
  IonLabel,
  IonInput,
  IonNote,
  IonButton,
  IonIcon,
} from '@ionic/react';
import WordListLocalMenu from './WordListLocalMenu';
import { AddSenseToWordlistsDto, SenseLineDTO, SenseListDto } from '../dto';
import { saveOutline } from 'ionicons/icons';

interface WordListItemProps {
  list: SenseListDto;
  onDeleteList: (listId: string) => void;
  onAddSenseToWordlist: (listId: string) => void;
  onUpdateListName: (newName: string) => void;
  navigateToList: (listId: string) => void;
}

const WordListItem: React.FC<WordListItemProps> = ({
  list,
  onDeleteList,
  onAddSenseToWordlist,
  navigateToList,
  onUpdateListName
}) => {
  const [isEdited, setIsEdited] = useState(false);
  const [inputValue, setInputValue] = useState<string>(list.title);
  const inputRef = useRef<HTMLIonInputElement>(null);

  const resetInput = () => {
    setInputValue(list.title);
    setIsEdited(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const iconElement = document.getElementById('save-list-name-icon');

    if (
      inputRef.current &&
      !inputRef.current.contains(iconElement as Node)
    ) {
      return;
    }

    if (
      inputRef.current &&
      !inputRef.current.contains(event.target as Node)
    ) {
      resetInput();
    }
  };

  useEffect(() => {
    if (isEdited) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEdited]);

  const editList = () => {
    setIsEdited(true);
  };

  const deleteListEv = () => {
    onDeleteList(list.ID);
  };

  const addSenseToWordlistsEv = (e: React.MouseEvent<HTMLIonButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    onAddSenseToWordlist(list.ID);
  };

  const handleInputChange = (e: CustomEvent) => {
    const newValue = (e.target as HTMLInputElement).value;
    setInputValue(newValue);
  };

  const updateListName = () => {
    onUpdateListName(inputValue);
    setIsEdited(false);
  };

  return (
    <div key={list.ID} style={{ position: 'relative' }}>
      {!isEdited ? (
        <>
          <IonItem button={true} onClick={() => navigateToList(list.ID)}>
            <IonLabel>{list.title}</IonLabel>
            <IonNote slot="end">6</IonNote>

            <div style={{
              position: 'absolute',
              top: '5px',
              right: '63px',
            }}>
              <IonButton size="small" onClick={addSenseToWordlistsEv}>
                add word
              </IonButton>
            </div>
          </IonItem>
          <div style={{
            position: 'absolute',
            top: '4px',
            right: '37px',
          }}>
            <WordListLocalMenu
              onDelete={deleteListEv}
              onEdit={editList}
            />
          </div>
        </>
      ) : (
        <>
          <IonItem>
            <IonInput
              ref={inputRef}
              style={{ width: 'unset' }}
              fill="outline"
              onIonInput={handleInputChange}
              value={inputValue}
              autofocus={true}
            />
          </IonItem>

          <div title='on-edit-save-icon' style={{
            position: 'absolute',
            top: '16px',
            right: '31px',
            zIndex: 1000
          }}>
            <IonIcon
              id='save-list-name-icon'
              onClick={updateListName}
              style={{ fontSize: '24px', cursor: 'pointer' }}
              icon={saveOutline}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default WordListItem;
