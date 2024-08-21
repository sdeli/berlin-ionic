import { IonBackButton, IonButton, IonButtons, IonCardTitle, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonToolbar } from '@ionic/react';
import styles from './Login.module.scss';

import { arrowBack, shapesOutline } from "ionicons/icons";
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { Action } from '../components/Action';
import CustomField from '../components/CustomField';
import { Wave } from '../components/Wave';
import { FormField, useLoginFields } from '../data/fields';
import { validateForm, ValidationError } from '../data/utils';
import { loginUserAction } from '../redux/AuthActions';
import { AppDispatch } from '../redux/store';

const Login: React.FC = () => {
    const navigate = useHistory(); // Initialize navigate function
    const dispatch = useDispatch<AppDispatch>();
    const params = useParams<{ [key: string]: string }>();

    const fields = useLoginFields();
    const [errors, setErrors] = useState<ValidationError[]>([]);

    const login = async (e: React.FormEvent) => {
      const validationErrors = validateForm(fields);
      setErrors(validationErrors);

      if (validationErrors.length !== 0) {
          console.log('validationErrors')
          console.log(validationErrors)
          return;
      }
      console.log(fields);
      const username = fields[0].input.state.value;
      const password = fields[1].input.state.value;
      try {
        await dispatch(loginUserAction({ username, password }, navigate));
        // Redirect to home or another page upon successful login
      } catch (error) {
        console.error('Login failed:', error);
      }
    };

    // const login = () => {
    //     const validationErrors = validateForm(fields);
    //     setErrors(validationErrors);

    //     if (validationErrors.length === 0) {
    //         console.log('validationErrors')
    //         console.log(validationErrors)
    //     }

    //     console.log(fields);
    // };

    useEffect(() => {
        return () => {
            fields.forEach((field: FormField) => field.input.state.reset(""));
            setErrors([]);
        };
    }, [params]);

    return (
        <IonPage className={styles.loginPage}>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton icon={arrowBack} text="" className="custom-back" />
                    </IonButtons>

                    <IonButtons slot="end">
                        <IonButton className="custom-button">
                            <IonIcon icon={shapesOutline} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonGrid className="ion-padding">
                    <IonRow>
                        <IonCol size="12" className={styles.headingText}>
                            <IonCardTitle>Log in</IonCardTitle>
                            <h5>Welcome back, hope you're doing well</h5>
                        </IonCol>
                    </IonRow>

                    <IonRow className="ion-margin-top ion-padding-top">
                        <IonCol size="12">
                            {fields.map((field: FormField) => (
                                <CustomField key={field.id} field={field} errors={errors} />
                            ))}
                            <IonButton className="custom-button" expand="block" onClick={login}>Login</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>

            <IonFooter>
                <IonGrid className="ion-no-margin ion-no-padding">
                    <Action message="Don't have an account?" text="Sign up" link="/signup" />
                    <Wave />
                </IonGrid>
            </IonFooter>
        </IonPage>
    );
};

export default Login;
