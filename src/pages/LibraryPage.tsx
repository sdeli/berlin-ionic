import React from 'react';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import { MainLoader } from '../components/MainLoader';

const LibraryPage = () => (
  <>
    <MainLoader></MainLoader>
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

export default LibraryPage;
