import { IonCol, IonProgressBar, IonRouterLink, IonRow } from "@ionic/react";
import { useSelector } from 'react-redux';
import { selectIsLoading } from '../redux/appSlice';

export const MainLoader = () => {
  const chosenWordIsLoading = useSelector(selectIsLoading);
  return (
    <IonProgressBar
      style={{
        position: 'fixed',
        zIndex: 1000,
        display: (chosenWordIsLoading ? 'block' : 'none')
      }}
      type="indeterminate" color="tertiary"
    ></IonProgressBar>
  )
}