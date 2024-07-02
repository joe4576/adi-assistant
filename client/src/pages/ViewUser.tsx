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
import api from "@/api";
import { WrapLoading } from "@/components/hocs/WrapLoading";

interface ViewUserProps extends RouteComponentProps<{ id: string }> {}

export const ViewUser = (props: ViewUserProps) => {
  const { data: user, isLoading } = api.userById.useQuery(
    parseInt(props.match.params.id)
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{user ? user.name : "View User"}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <WrapLoading isLoading={isLoading}>
          <pre>{JSON.stringify(user)}</pre>
        </WrapLoading>
      </IonContent>
    </IonPage>
  );
};
