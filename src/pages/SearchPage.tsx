import React, { useState, useEffect, ChangeEventHandler, ChangeEvent } from 'react';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonList, IonListHeader, IonSelect, IonSelectOption, IonTitle, IonToolbar, SelectChangeEventDetail } from '@ionic/react';
import { IonSelectCustomEvent } from '@ionic/core';
import { MainLoader } from '../components/MainLoader';
import { personCircle, personCircleOutline } from 'ionicons/icons';
import { TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectLists } from '../redux/wordListsSlice';
import { selectUser } from '../redux/authSlice';
import { useAppDispatch } from '../redux/hooks';
import { fetchWordlistsByUserIdAction } from '../redux/wordListsActions';
import { isStringArray } from '../data/utils';
import { addWordAction } from '../redux/wordActions';
import { AddWordDto, DefaultListNamesDto } from '../dto';
import toastService from '../libs/toastService';

const SearchPage = () => {
  const wordLists = useSelector(selectLists);
  const user = useSelector(selectUser);
  if (!user) return '';
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchWordlistsByUserIdAction(user.id));
    }
  }, [dispatch, user]);

  const [germanWord, setGermanWord] = useState('');
  const [englishWord, setEnglishWord] = useState('');
  const [selectedLists, setSelectedLists] = useState<string[]>([]);
  useEffect(() => {
    const storedGermanWord = sessionStorage.getItem('germanWord');
    const storedEnglishWord = sessionStorage.getItem('englishWord');
    let storedLists = sessionStorage.getItem('selectedLists');
    if (storedGermanWord) setGermanWord(storedGermanWord);
    if (storedEnglishWord) setEnglishWord(storedEnglishWord);

    if (!storedLists) return;
    const storedListsArr = JSON.parse(storedLists)
    if (storedListsArr) {
      setSelectedLists(storedListsArr)
    }
  }, []);

  const ionSelectOptions = wordLists.filter(
    list => list.title !== DefaultListNamesDto.SearchHistory && list.title !== DefaultListNamesDto.YourWords
  ).map((list, i) =>
    <IonSelectOption key={i} value={list.ID}>{list.title}</IonSelectOption>
  )

  const handleAdd = async () => {
    if (!englishWord) console.log('no english');
    if (!germanWord) console.log('no no german');
    const dto: AddWordDto = {
      englishWord,
      germanWord,
      listIds: selectedLists,
      userId: user?.id
    }
    dispatch(addWordAction(dto)).then((succesfullySaved) => {
      if (succesfullySaved) {
        resetAddWordForm();
        toastService.showSuccessToast('Your word has been succesfully saved!');
      }
    })
  };

  function handleGermanWordChange(event: ChangeEvent<HTMLInputElement>) {
    setGermanWord(event.target.value)
    sessionStorage.setItem('germanWord', event.target.value);
  }

  function handleEnglishWordChange(event: ChangeEvent<HTMLInputElement>) {
    setEnglishWord(event.target.value)
    sessionStorage.setItem('englishWord', event.target.value);
  }

  function handleSelectedListChange(event: IonSelectCustomEvent<SelectChangeEventDetail>) {
    if (Array.isArray(!event.target.value)) return false;
    if (!event.target.value.length) {
      setSelectedLists([]);
      sessionStorage.setItem('selectedLists', JSON.stringify([]));
      return;
    }
    const isValidValue = isStringArray(event.target.value);
    if (isValidValue) {
      setSelectedLists(event.target.value);
      sessionStorage.setItem('selectedLists', JSON.stringify(event.target.value));

    }
  }

  function resetAddWordForm() {
    setGermanWord('')
    sessionStorage.setItem('germanWord', '');
    setEnglishWord('')
    sessionStorage.setItem('englishWord', '');
    setSelectedLists([]);
    sessionStorage.setItem('selectedLists', JSON.stringify([]));
  }

  return (
    <>
      <MainLoader />

      <IonHeader class="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton default-href="#" />
          </IonButtons>
          <IonTitle>Search</IonTitle>
          <IonButtons slot="end">
            <IonButton color="dark">
              <IonIcon slot="icon-only" ios={personCircleOutline} md={personCircle} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div style={{ maxWidth: '1000px', margin: 'auto' }}>
          <IonListHeader style={{ marginBottom: '20px' }}>Add Your Word to the Dictionary</IonListHeader>
          <div>
            <TextField
              style={{ marginBottom: '20px' }}
              id="german-word"
              label="German word"
              variant="outlined"
              fullWidth
              value={germanWord}
              onChange={handleGermanWordChange}
            />
            <TextField
              style={{ marginBottom: '20px' }}
              id="english-word"
              label="English word"
              variant="outlined"
              fullWidth
              value={englishWord}
              onChange={handleEnglishWordChange}
            />
            {!!ionSelectOptions.length &&
              <IonList style={{ marginBottom: '20px' }}>
                <IonItem>
                  <IonSelect
                    aria-label="List"
                    placeholder="Choose a list"
                    multiple={true}
                    value={selectedLists}
                    onIonChange={handleSelectedListChange}
                  >
                    {ionSelectOptions}
                  </IonSelect>
                </IonItem>
              </IonList>
            }

            <IonButton onClick={handleAdd}>Add</IonButton>
          </div>
        </div>
      </IonContent>
    </>
  );
};

export default SearchPage;
