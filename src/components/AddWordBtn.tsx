import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { add } from 'ionicons/icons';

export function AddWordBtn() {
  return (
    <IonFab horizontal="end" vertical="bottom" slot="">
      <IonFabButton>
        <IonIcon icon={add}></IonIcon>
      </IonFabButton>
    </IonFab>
  );
}
export default AddWordBtn;