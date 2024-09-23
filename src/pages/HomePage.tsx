import React from 'react';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/react';
import { SensesTable } from '../components/SensesTable';
import { MainLoader } from '../components/MainLoader';
import { personCircle, personCircleOutline } from 'ionicons/icons';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/authSlice';
import { useAppDispatch } from '../redux/hooks';
import { clearChosenWordAction, clearWordsAction, fetchChosenWordAction, fetchWordsAction } from '../redux/wordActions';
import { selectChosenWord, selectWords } from '../redux/wordSlice';
import WordFuzzySearch, { WordsItems } from '../components/WordFuzzySearch';

const HomePage: React.FC = () => {
  const chosenWord = useSelector(selectChosenWord);
  const user = useSelector(selectUser);
  const words = useSelector(selectWords);
  if (!user) return (<div>User missing</div>)

  const wordsItems: WordsItems[] = words.map((word, i) => {
    return {
      label: word.text,
      id: i
    }
  });

  const dispatch = useAppDispatch();

  const onChangeHandler = (chosenWordsText: string) => {
    return dispatch(fetchChosenWordAction(chosenWordsText, user.id));
  }

  const handleType = (inputValue: string) => {
    const userClearedInput = !inputValue;
    if (userClearedInput) {
      dispatch(clearChosenWordAction());
      dispatch(clearWordsAction());
    } else {
      dispatch(fetchWordsAction(user.id, inputValue));
    }
  };

  return (
    <>
      <MainLoader></MainLoader>

      <IonHeader class="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton default-href="#"></IonBackButton>
          </IonButtons>
          <IonTitle>Dictionary</IonTitle>
          <IonButtons slot="end">
            <IonButton color="dark">
              <IonIcon slot="icon-only" ios={personCircleOutline} md={personCircle}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div
          style={{ marginTop: '50px' }}
        >
          <div>
            <WordFuzzySearch
              chosenWord={chosenWord?.text || ''}
              words={wordsItems}
              onChangeEv={onChangeHandler}
              onTypeEv={handleType}
            ></WordFuzzySearch>
          </div>
          <br></br>
          <div style={{
            maxWidth: '1000px',
            margin: 'auto'
          }}>
            <SensesTable></SensesTable>
          </div>
        </div>
      </IonContent>
    </>

  )
}

export default HomePage;
