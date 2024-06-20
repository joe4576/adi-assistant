import { type User } from "firebase/auth";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

export const UserPage = (user: User) => {
  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton />
            </IonButtons>
            <IonTitle>User</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <h1>User</h1>
          <p>{user.email}</p>
        </IonContent>
      </IonPage>
    </>
  );
};
