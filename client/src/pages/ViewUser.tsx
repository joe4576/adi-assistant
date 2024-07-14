import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { RouteComponentProps } from "react-router";
import api from "@/api";
import { WrapLoading } from "@/components/hocs/WrapLoading";
import React, { useRef } from "react";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";

interface ViewUserProps extends RouteComponentProps<{ id: string }> {}

export const ViewUser = (props: ViewUserProps) => {
  const { data: user, isLoading } = api.userById.useQuery(
    props.match.params.id,
  );

  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);

  function confirm() {
    modal.current?.dismiss(input.current?.value, "confirm");
  }

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === "confirm") {
      console.log("User confirmed: ", ev.detail.data);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{user ? user.name : "View User"}</IonTitle>
          {user && (
            <IonButtons slot="end">
              <IonButton id="edit-user">
                <IonIcon
                  slot={"icon-only"}
                  src={"/src/assets/custom-pencil.svg"}
                />
              </IonButton>
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent className={"ion-padding"}>
        <WrapLoading isLoading={isLoading}>
          <pre>{JSON.stringify(user)}</pre>
          <IonModal
            ref={modal}
            trigger="edit-user"
            onWillDismiss={(ev) => onWillDismiss(ev)}
          >
            <IonHeader>
              <IonToolbar>
                <IonButtons slot="start">
                  <IonButton onClick={() => modal.current?.dismiss()}>
                    Cancel
                  </IonButton>
                </IonButtons>
                <IonTitle>Welcome</IonTitle>
                <IonButtons slot="end">
                  <IonButton strong={true} onClick={() => confirm()}>
                    Confirm
                  </IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
              <IonItem>
                <IonInput
                  label="Edit name"
                  labelPlacement="stacked"
                  ref={input}
                  type="text"
                  placeholder="Your name"
                />
              </IonItem>
            </IonContent>
          </IonModal>
        </WrapLoading>
      </IonContent>
    </IonPage>
  );
};
