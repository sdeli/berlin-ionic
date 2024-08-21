import React from 'react';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import { DictionaryDash } from '../components/DictionaryDash';
import { SensesTable } from '../components/SensesTable';

const HomePage: React.FC = () => {
  
  return (
  <>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Dictionary</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent>
      <div
        // style={{
        //   display: 'flex',
        //   justifyContent: 'center',
        //   height: '100%',
        //   flexDirection: 'column'
        // }}
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
