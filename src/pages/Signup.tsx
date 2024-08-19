import { IonBackButton, IonButton, IonButtons, IonCardTitle, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonPage, IonRouterLink, IonRow, IonToolbar } from '@ionic/react';
import styles from './Signup.module.scss';

import { arrowBack, shapesOutline } from "ionicons/icons";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useSignupFields } from '../data/fields';
import { validateForm, ValidationError } from '../data/utils';
import CustomField from '../components/CustomField';
import { Action } from '../components/Action';
import { Wave } from '../components/Wave';

const Signup = () => {

    const params = useParams();
    const fields = useSignupFields();
    const [ errors, setErrors ] = useState<ValidationError[]>([]);

    const createAccount = () => {

        const errors = validateForm(fields);
        setErrors(errors);

        if (!errors.length) {

            //  Submit your form here
        }
    }

    useEffect(() => {

        return () => {

            fields.forEach(field => field.input.state.reset(""));
            setErrors([]);
        }
    }, [params]);
	
	return (
		<IonPage className={ styles.signupPage }>
			<IonHeader>
				<IonToolbar>
					
                    <IonButtons slot="start">
                        <IonBackButton icon={ arrowBack } text="" className="custom-back" />
                    </IonButtons>

                    <IonButtons slot="end">
                        <IonButton className="custom-button">
                            <IonIcon icon={ shapesOutline } />
                        </IonButton>
                    </IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
                <IonGrid className="ion-padding">
                    <IonRow>
                        <IonCol size="12" className={ styles.headingText }>
                            <IonCardTitle>Sign up</IonCardTitle>
                            <h5>Lets get to know each other</h5>
                        </IonCol>
                    </IonRow>

                    <IonRow className="ion-margin-top ion-padding-top">
                        <IonCol size="12">

                            { fields.map(field => {

                                return <CustomField key={field.id} field={ field } errors={ errors } />;
                            })}

                            <IonButton className="custom-button" expand="block" onClick={ createAccount }>Create account</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
			</IonContent>

			<IonFooter>
				<IonGrid className="ion-no-margin ion-no-padding">

                    <Action message="Already got an account?" text="Login" link="/login" />
                    <Wave />
				</IonGrid>
			</IonFooter>
		</IonPage>
	);
};

export default Signup;