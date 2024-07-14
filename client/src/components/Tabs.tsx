import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { Redirect, Route } from "react-router-dom";
import { triangle, square, cogOutline } from "ionicons/icons";
import { Home } from "@/pages/Home";
import { ListStudents } from "@/pages/ListStudents";
import React from "react";
import { ViewStudent } from "@/pages/ViewStudent";
import { Settings } from "@/pages/Settings";

export const Tabs = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/home" exact component={Home}></Route>
        <Route path="/students" exact component={ListStudents}></Route>
        <Route
          path="/students/:id"
          render={(props) => <ViewStudent {...props} />}
        ></Route>
        <Route path="/settings" exact component={Settings}></Route>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/home">
          <IonIcon icon={triangle}></IonIcon>
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="students" href="/students">
          <IonIcon icon={square}></IonIcon>
          <IonLabel>Students</IonLabel>
        </IonTabButton>
        <IonTabButton tab="settings" href="/settings">
          <IonIcon icon={cogOutline}></IonIcon>
          <IonLabel>Settings</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};
