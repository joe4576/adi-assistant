import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { RouteComponentProps } from "react-router";
import api from "@client/api";
import { WrapLoading } from "@client/components/hocs/WrapLoading";
import React from "react";

interface ViewUserProps extends RouteComponentProps<{ id: string }> {}

export const ViewStudent = (props: ViewUserProps) => {
  const { data: student, isLoading } = api.student.getStudentById.useQuery(
    props.match.params.id,
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{student ? student.name : "View User"}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className={"ion-padding"}>
        <WrapLoading isLoading={isLoading}>
          <pre>{JSON.stringify(student)}</pre>
        </WrapLoading>
      </IonContent>
    </IonPage>
  );
};
