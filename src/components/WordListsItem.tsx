import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import {
  IonItem,
  IonLabel,
  IonInput,
  IonNote,
  IonButton,
  IonIcon,
} from '@ionic/react';
import WordListLocalMenu from './WordListLocalMenu';
import { SenseListDto } from '../dto';
import { saveOutline } from 'ionicons/icons';

interface WordListItemProps {
  list: SenseListDto;
  displayAddWordBtn: boolean;
  onDeleteList: (listId: string) => void;
  onAddSenseToWordlist: (listId: string) => void;
  onUpdateListName: (newName: string) => Promise<void>;
  navigateToList: (listId: string) => void;
}

const WordListItem: React.FC<WordListItemProps> = ({
  list,
  displayAddWordBtn = false,
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

  const handleClickOutsideWhenEditing = (event: MouseEvent) => {
    const iconElement = document.getElementById('save-list-name-icon');
    if (!iconElement) return;

    const clickedSaveIcon = event.target === iconElement;
    if (clickedSaveIcon) {
      return;
    }

    const clickedInput = inputRef.current && inputRef.current.contains(event.target as Node);
    const clickedOut = !clickedInput && !clickedSaveIcon;
    if (clickedOut) {
      resetInput();
      return;
    }
  };

  useEffect(() => {
    if (isEdited) {
      document.addEventListener('mousedown', handleClickOutsideWhenEditing);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideWhenEditing);
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

  const updateListName = async () => {
    await onUpdateListName(inputValue);
    setIsEdited(false);
  };
  const localMenuStyles = {
    marginLeft: '-6px',
    marginRight: '-2px'
  }

  return (
    <div key={list.ID} style={{ position: 'relative' }}>
      {!isEdited ? (
        <div>
          <IonItem button={true} onClick={() => navigateToList(list.ID)}>
            <IonLabel>{list.title}</IonLabel>
          </IonItem>

          <div title="word-list-item-local-menu" style={{
            display: 'flex',
            position: 'absolute',
            top: '5px',
            right: '35px',
          }}>
            {displayAddWordBtn && (
              <IonButton size="small" onClick={addSenseToWordlistsEv}>
                add word
              </IonButton>
            )}
            <div style={{
              ...(displayAddWordBtn && localMenuStyles)
            }}>
              <WordListLocalMenu
                onDelete={deleteListEv}
                onEdit={editList}
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          <IonItem>
            <IonInput
              id="edit-word-list-name-input"
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
            top: '12px',
            right: '56px',
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
      )
      }
    </div >
  );
}

export default WordListItem;
