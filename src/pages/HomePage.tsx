import React from 'react';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/react';
import { DictionaryDash } from '../components/DictionaryDash';
import { SensesTable } from '../components/SensesTable';
import { MainLoader } from '../components/MainLoader';
import { personCircle, personCircleOutline } from 'ionicons/icons';

const HomePage: React.FC = () => {

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
            <DictionaryDash></DictionaryDash>
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
