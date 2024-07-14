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
import { WrapLoading } from "@/components/hocs/WrapLoading";

export const ListStudents = () => {
  const {
    data: students,
    error,
    isLoading,
  } = api.student.getAllStudents.useQuery();

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
          <IonListHeader>Students</IonListHeader>
          <WrapLoading isLoading={isLoading}>
            {students?.map((student) => (
              <IonItem key={student.id} routerLink={`/students/${student.id}`}>
                <IonLabel>{student.name}</IonLabel>
              </IonItem>
            ))}
          </WrapLoading>
        </IonList>
      </IonContent>
    </IonPage>
  );
};
