import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { getAuth, signOut } from "firebase/auth";
import api from "@/api";

export const UsersList = () => {
  const logOut = async () => {
    await signOut(getAuth());
  };

  const { data: users } = api.userList.useQuery();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Users</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonListHeader>Users</IonListHeader>
          {users?.map((user) => (
            <IonItem key={user.id} routerLink={`/users/${user.id}`}>
              <IonLabel>{user.name}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};
