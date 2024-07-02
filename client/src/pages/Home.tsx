import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export const Home = () => {
  console.log("home render");
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"primary"}>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className={"ion-padding"}>
        <h1>This is the home page</h1>
        <LoadingSpinner />
      </IonContent>
    </IonPage>
  );
};
