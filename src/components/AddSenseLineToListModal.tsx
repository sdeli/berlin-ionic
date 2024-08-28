import "./SensesTable.scss";

import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonItem,
  IonInput,
} from '@ionic/react';
import { useState } from 'react';
import { SenseLineDTO } from '../dto';
interface AddSenseLineToListModalProps {
  isOpen: boolean;
  onClose: () => void;
  line: SenseLineDTO | null;
}
export const AddSenseLineToListModal = ({ isOpen, onClose, line }: AddSenseLineToListModalProps) => {
  return (
    <div className="container">
      <IonModal isOpen={isOpen} trigger="open-modal" onWillDismiss={onClose}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={onClose}>Cancel</IonButton>
              </IonButtons>

              <IonTitle>Welcome</IonTitle>

              <IonButtons slot="end">
                <IonButton strong={true} onClick={() => confirm()}>
                  Confirm
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <p>{line?.target.text}</p>
            <IonItem>
              <IonInput
                label="Enter your name"
                labelPlacement="stacked"
                type="text"
                placeholder="Your name"
              />
            </IonItem>
          </IonContent>
        </IonModal>
    </div>
  )
}