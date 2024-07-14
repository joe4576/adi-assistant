import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import { Student } from "@server/services/student.service";

export const AddStudentModal = ({
  dismiss,
}: {
  dismiss: (student: Student, role?: string) => void;
}) => {
  const [student, setStudent] = useState<Student>({
    id: "",
    name: "",
  });

  // TODO add form validation

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton
              color="medium"
              onClick={() => dismiss(student, "cancel")}
            >
              Cancel
            </IonButton>
          </IonButtons>
          <IonTitle>Welcome</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={() => dismiss(student, "confirm")}
              strong={true}
            >
              Add Student
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonInput
            value={student.name}
            type="text"
            labelPlacement="stacked"
            label="Enter Student name"
            placeholder="Student name"
            required
            onIonInput={(e) =>
              setStudent({ ...student, name: e.target.value as string })
            }
          />
        </IonItem>
      </IonContent>
    </IonPage>
  );
};
