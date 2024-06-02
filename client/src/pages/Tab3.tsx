import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Tab3.css";
import api from "@/api";

const Tab3 = () => {
  const { data: users, isLoading } = api.getAllEmployees.useQuery()

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>
        {users && (
          <div>
            {(users as any).map((user) => (
              <div key={user.id}>{user.name}</div>
            ))}
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
