import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { getAuth, signOut } from "firebase/auth";
import { useHistory } from "react-router";
import { useContext } from "react";
import { FirebaseUserContext } from "@/context/firebaseUserContext";

export const About = () => {
  const { replace } = useHistory();
  const user = useContext(FirebaseUserContext);
  const logOut = async () => {
    const result = await signOut(getAuth());
    replace("/login");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>About</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h1>About</h1>
        <IonButton onClick={logOut}>Log out</IonButton>
      </IonContent>
    </IonPage>
  );
};
