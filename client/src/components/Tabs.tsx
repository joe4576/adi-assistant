import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { Redirect, Route } from "react-router-dom";
import { triangle, square } from "ionicons/icons";
import { Home } from "@/pages/Home";
import { UsersList } from "@/pages/UsersList";
import React from "react";
import { ViewUser } from "@/pages/ViewUser";

export const Tabs = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/home" exact component={Home}></Route>
        <Route path="/users" exact component={UsersList}></Route>
        <Route
          path="/users/:id"
          render={(props) => <ViewUser {...props} />}
        ></Route>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/home">
          <IonIcon icon={triangle}></IonIcon>
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="users" href="/users">
          <IonIcon icon={square}></IonIcon>
          <IonLabel>Users</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};
