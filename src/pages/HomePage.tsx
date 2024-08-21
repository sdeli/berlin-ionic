import React from 'react';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import { DictionaryDash } from '../components/DictionaryDash';

const HomePage = () => (
  <>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Listen now</IonTitle>
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
        <DictionaryDash></DictionaryDash>
      </div>
    </IonContent>
  </>
);

export default HomePage;
