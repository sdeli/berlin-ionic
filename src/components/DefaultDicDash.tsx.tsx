import { IonCol, IonGrid, IonItem, IonLabel, IonList, IonRouterLink, IonRow } from "@ionic/react";
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/authSlice';

export interface ActionProps {
  message: string;
  text: string;
  link: string
}

export const DefaultDicDash = () => {
  const user = useSelector(selectUser);

  return (
    <IonGrid>
      <IonRow>
        <IonCol size="12" size-sm="4" offsetSm='4'>
          <IonList>
            <IonItem>
              <IonLabel>Dear: {user?.username}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Please search for a word</IonLabel>
            </IonItem>
          </IonList>
        </IonCol>
      </IonRow>
    </IonGrid >
  )
};