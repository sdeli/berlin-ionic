import React, { useState, useEffect } from 'react';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonList, IonListHeader, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
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
import { AddWordDto } from '../dto';

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
    const storedLists = sessionStorage.getItem('selectedLists');

    if (storedGermanWord) setGermanWord(storedGermanWord);
    if (storedEnglishWord) setEnglishWord(storedEnglishWord);
    if (storedLists) {
      const storedListsArr = isStringArray(JSON.parse(storedLists))
      if (storedListsArr) setSelectedLists(storedListsArr);
    }
  }, []);

  // Store data in sessionStorage when inputs change
  useEffect(() => {
    sessionStorage.setItem('germanWord', germanWord);
    sessionStorage.setItem('englishWord', englishWord);
    sessionStorage.setItem('selectedLists', JSON.stringify(selectedLists));
  }, [germanWord, englishWord, selectedLists]);

  const ionSelectOptions = wordLists.filter(list => list.title !== 'Search History').map((list, i) =>
    <IonSelectOption key={i} value={list.ID}>{list.title}</IonSelectOption>
  )

  const handleAdd = () => {
    if (!englishWord) console.log('no english');
    if (!germanWord) console.log('no no german');
    const dto: AddWordDto = {
      englishWord,
      germanWord,
      listIds: selectedLists,
      userId: user?.id
    }

    console.log({ germanWord, englishWord, selectedLists });
    return dispatch(addWordAction(dto))
  };

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
              onChange={(e) => setGermanWord(e.target.value)}
            />
            <TextField
              style={{ marginBottom: '20px' }}
              id="english-word"
              label="English word"
              variant="outlined"
              fullWidth
              value={englishWord}
              onChange={(e) => setEnglishWord(e.target.value)}
            />
            {ionSelectOptions &&
              <IonList style={{ marginBottom: '20px' }}>
                <IonItem>
                  <IonSelect
                    aria-label="List"
                    placeholder="Choose a list"
                    multiple={true}
                    value={selectedLists}
                    onIonChange={(e) => setSelectedLists(e.detail.value)}
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
