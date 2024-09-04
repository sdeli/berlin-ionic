import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { selectLists } from '../redux/wordListsSlice';
import WordsListPage from './WordsListPage';

const ListsPage = () => {
  const { id } = useParams<{ id: string }>();
  console.log('id')
  console.log(id)
  if (id) {
    return (
      <WordsListPage></WordsListPage>
    );
  }
  
  return (
      <>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Library</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        Library content
      </div>
    </IonContent>
  </>
);
}

export default ListsPage;
