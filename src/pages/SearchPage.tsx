import React from 'react';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/react';
import { MainLoader } from '../components/MainLoader';
import { personCircle, personCircleOutline } from 'ionicons/icons';

const SearchPage = () => (
  <>
    <MainLoader></MainLoader>

    <IonHeader class="ion-no-border">
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton default-href="#"></IonBackButton>
        </IonButtons>
        <IonTitle>Search</IonTitle>
        <IonButtons slot="end">
          <IonButton color="dark">
            <IonIcon slot="icon-only" ios={personCircleOutline} md={personCircle}></IonIcon>
          </IonButton>
        </IonButtons>
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
        Search content
      </div>
    </IonContent>
  </>
);

export default SearchPage;
