import { IonContent, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { selectLists } from '../redux/wordListsSlice';
import { removeCircleOutline } from 'ionicons/icons';
import { useAppDispatch } from '../redux/hooks';
import { fetchWordlistsByUserIdAction, removeSenseFromWordlistAction } from '../redux/wordListsActions';
import { selectUser } from '../redux/authSlice';
import { useEffect } from 'react';
import { MainLoader } from '../components/MainLoader';

const SenseListPage = () => {
  const dispatch = useAppDispatch();
  const { id: activeListId } = useParams<{ id: string }>();
  const user = useSelector(selectUser);

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

  let lines = !activeList.senseLines ? 'no line to show' : activeList.senseLines.map((line) => {
    const sourceText = line.source.text;

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
      <IonHeader>
        <IonToolbar>
          <IonTitle>List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
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
