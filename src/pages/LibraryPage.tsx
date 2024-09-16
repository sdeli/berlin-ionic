import { MainLoader } from '../components/MainLoader';
import type { ToggleCustomEvent } from '@ionic/react';
import { personCircle, personCircleOutline, sunny, sunnyOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonRange,
  IonText,
  IonTitle,
  IonToggle,
  IonToolbar,
} from '@ionic/react';
const LibraryPage = () => {
  const isDark = !![...document.documentElement.classList].find((currClass) => currClass === 'ion-palette-dark');
  const [paletteToggle, setPaletteToggle] = useState(isDark);
  const toggleChange = (ev: ToggleCustomEvent) => {
    toggleDarkPalette(ev.detail.checked);
  };

  const toggleDarkPalette = (shouldAdd: boolean) => {
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
    setPaletteToggle(shouldAdd);
  };

  return (
    <>
      <IonHeader class="">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton default-href="#"></IonBackButton>
          </IonButtons>
          <IonTitle>Display</IonTitle>
          <IonButtons slot="end">
            <IonButton color="dark">
              <IonIcon slot="icon-only" ios={personCircleOutline} md={personCircle}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <div style={{
        height: '2000px',
        maxWidth: '1000px',
        margin: 'auto'
      }}>
        <IonContent>
          <IonListHeader>Appearance</IonListHeader>
          <IonList inset={true}>
            <IonItem>
              <IonToggle checked={paletteToggle} onIonChange={toggleChange} justify="space-between">
                Dark Mode
              </IonToggle>
            </IonItem>
          </IonList>

          <IonList inset={true}>
            <IonItem button={true}>Text Size</IonItem>
            <IonItem>
              <IonToggle justify="space-between">Bold Text</IonToggle>
            </IonItem>
          </IonList>

          <IonListHeader>Brightness</IonListHeader>
          <IonList inset={true}>
            <IonItem>
              <IonRange value={40}>
                <IonIcon icon={sunnyOutline} slot="start"></IonIcon>
                <IonIcon icon={sunny} slot="end"></IonIcon>
              </IonRange>
            </IonItem>
            <IonItem>
              <IonToggle justify="space-between" checked>
                True Tone
              </IonToggle>
            </IonItem>
          </IonList>

          <IonList inset={true}>
            <IonItem button={true}>
              <IonLabel>Night Shift</IonLabel>
              <IonText slot="end" color="medium">
                9:00 PM to 8:00 AM
              </IonText>
            </IonItem>
          </IonList>
        </IonContent>

      </div>
    </>
  );
};

export default LibraryPage;

