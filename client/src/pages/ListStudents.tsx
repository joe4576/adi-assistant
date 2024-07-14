import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import api from "@client/api";
import { WrapLoading } from "@client/components/hocs/WrapLoading";
import { addOutline } from "ionicons/icons";
import { useAddStudentModal } from "@client/components/modals/useAddStudentModal";

export const ListStudents = () => {
  const { openModal } = useAddStudentModal();

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
          <IonButtons slot="end">
            <IonButton id="edit-student" onClick={() => openModal()}>
              <IonIcon slot={"icon-only"} icon={addOutline} />
            </IonButton>
          </IonButtons>
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
