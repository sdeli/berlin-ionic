import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { selectLists } from '../redux/wordListsSlice';
import { personCircle, personCircleOutline, removeCircleOutline } from 'ionicons/icons';
import { useAppDispatch } from '../redux/hooks';
import { fetchWordlistsByUserIdAction, removeSenseFromWordlistAction } from '../redux/wordListsActions';
import { selectUser } from '../redux/authSlice';
import { useEffect, useState } from 'react';
import { MainLoader } from '../components/MainLoader';
import { SenseLineDTO } from '../dto';
import { TextField } from '@mui/material';
import reactLogo from '../assets/react.svg';
import style from './SenseListPage.module.scss';
import { highlightChosenWord } from '../libs/utils';

const SenseListPage = () => {
  const user = useSelector(selectUser);
  if (!user) return (<div>User missing</div>)

  const storedWord = sessionStorage.getItem('chosenWord');
  const [chosenWord, setChosenWord] = useState(storedWord || '');
  const { id: activeListId } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchWordlistsByUserIdAction(user.id));
    }
  }, [dispatch, user]);

  const wordLists = useSelector(selectLists);
  const activeList = wordLists.find((list => list.ID === activeListId));
  if (!activeList) return (<></>);

  const removeSenseFromWordlist = (lineId: string, listId: string) => {
    dispatch(removeSenseFromWordlistAction(lineId, listId));
  }

  const handleType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChosenWord(event.target.value);
    sessionStorage.setItem('chosenWord', event.target.value);
  }

  let senseLines: SenseLineDTO[] = [];
  const listHasAddedWords = activeList.senseLines && activeList.senseLines.length;
  if (listHasAddedWords) {
    if (chosenWord) {
      senseLines = activeList.senseLines.filter((line) => {
        return line.source.text.toLocaleLowerCase().includes(chosenWord.toLocaleLowerCase());
      });
    } else {
      senseLines = activeList.senseLines;
    }
  }

  let lines = !senseLines ? 'no lines to show' : senseLines.map((line) => {
    let sourceText: string;
    if (chosenWord) {
      sourceText = highlightChosenWord(chosenWord, line.source.text);
    } else {
      sourceText = line.source.text;
    }

    return (
      <div key={line.ID} className="senses-table-row">
        <div className="senses-table-data" style={{ paddingLeft: '10px' }} dangerouslySetInnerHTML={{ __html: sourceText }}></div>
        <div className="senses-table-data">
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <span style={{ width: '85%' }}>
              {line.target.text}
            </span>
            <span style={{
              width: '15%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <IonIcon
                onClick={() => { removeSenseFromWordlist(line.ID, activeList.ID) }}
                style={{ fontSize: '24px', cursor: 'pointer' }}
                icon={removeCircleOutline}
              />
            </span>
          </div>
        </div>
      </div>
    )
  })

  return (
    <>
      <MainLoader></MainLoader>
      <IonHeader class="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton default-href="#"></IonBackButton>
          </IonButtons>
          <IonTitle>List</IonTitle>
          <IonButtons slot="end">
            <IonButton color="dark">
              <IonIcon slot="icon-only" ios={personCircleOutline} md={personCircle}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {listHasAddedWords ?
          <div style={{ marginTop: '50px' }} className={style.main}>
            <>
              <div className={style.logo}>
                <a href="https://react.dev" target="_blank">
                  <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
              </div>
              <div style={{ width: '300px' }}>
                <TextField
                  onChange={handleType}
                  id="outlined-basic" label={'Search in ' + activeList.title} variant="outlined"
                  fullWidth={true}
                  value={chosenWord}
                />
              </div>
            </>
          </div>
          : ''}

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '40px'

          }}
        >
          <div key={activeList.ID} className="senses-table">
            <div className="senses-table-header">
              <div className="header__item"><a id="name" className="filter__link" href="#">{activeList.title}</a></div>
            </div>

            <div className="senses-table-content">
              {lines}
            </div>
          </div>
        </div>
      </IonContent>
    </>
  );
}

export default SenseListPage;
