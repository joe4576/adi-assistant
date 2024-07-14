import {
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
import api from "@/api";

export const UsersList = () => {
  const { data: users, error } = api.userList.useQuery();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
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
