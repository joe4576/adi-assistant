import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

// Initialise firebase
import "@/plugins/initialiseFirebase";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

import "./theme/variables.css";
import trpc, { queryClient, trpcClient } from "@/api";
import { QueryClientProvider } from "@tanstack/react-query";
import { FirebaseUserContext } from "@/context/firebaseUserContext";
import React from "react";
import { useFirebaseAuthentication } from "@/hooks/useFirebaseAuthentication";
import { Login } from "@/components/Login";
import { Home } from "@/pages/Home";
import { About } from "@/pages/About";

setupIonicReact();

const App = () => {
  const [user] = useFirebaseAuthentication();

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <FirebaseUserContext.Provider value={user}>
          <IonApp>
            <IonReactRouter>
              <IonRouterOutlet>
                <Route exact path="/login" component={Login} />
                <Route
                  path="/"
                  exact
                  render={() => (user ? <Home /> : <Redirect to="/login" />)}
                />
                <Route
                  path="/about"
                  exact
                  render={() => (user ? <About /> : <Redirect to="/login" />)}
                />
                <Route render={() => <Redirect to="/" />} />
              </IonRouterOutlet>
            </IonReactRouter>
          </IonApp>
        </FirebaseUserContext.Provider>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default App;
