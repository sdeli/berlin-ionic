import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import './global.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.class.css';

import './theme/variables.css';
import HomePage from './pages/HomePage';
import LibraryPage from './pages/LibraryPage';
import SearchPage from './pages/SearchPage';
import { playCircle, radio, library, search } from 'ionicons/icons';
import Signup from './pages/Signup';
import Login from './pages/Login';
import store from './redux/store';
import React from 'react';
import { ProtectedPageGuard, UnprotectedPageGuard } from './route-guards';
import SenseListPage from './pages/SenseListPage';
import { WordListPage } from './pages/WordListsPage';
import { DotEnv } from './types';

const env = import.meta.env as unknown as DotEnv;

if (!env.VITE_ENV) {
  // @ts-ignore
  env.VITE_ENV = window.SERVER_DATA.ENV as string
}

setupIonicReact({ mode: 'ios' });

const App: React.FC = () => (
  <React.StrictMode>
    <Provider store={store}>
      <IonApp>
        <IonReactRouter>
          <Route exact path="/signup">
            <UnprotectedPageGuard element={<Signup />} />
          </Route>

          <Route exact path="/login">
            <UnprotectedPageGuard element={<Login />} />
          </Route>

          <Route exact path="/">
            <Redirect to="/login" />
          </Route>

          <Route path="/dic">
            <ProtectedPageGuard element={
              <IonTabs>
                <IonRouterOutlet>
                  <Redirect exact path="/dic" to="/dic/home" />
                  <Route exact path="/dic/home">
                    <HomePage />
                  </Route>
                  <Route exact path="/dic/list/:id">
                    <SenseListPage />
                  </Route>
                  <Route exact path="/dic/list/">
                    <WordListPage />
                  </Route>
                  <Route exact path="/dic/library">
                    <LibraryPage />
                  </Route>
                  <Route exact path="/dic/search">
                    <SearchPage />
                  </Route>
                </IonRouterOutlet>

                <IonTabBar slot="bottom">
                  <IonTabButton tab="home" href="/dic/home">
                    <IonIcon icon={playCircle} />
                    <IonLabel>Listen now</IonLabel>
                  </IonTabButton>

                  <IonTabButton tab="radio" href="/dic/list">
                    <IonIcon icon={radio} />
                    <IonLabel>List</IonLabel>
                  </IonTabButton>

                  <IonTabButton tab="library" href="/dic/library">
                    <IonIcon icon={library} />
                    <IonLabel>Library</IonLabel>
                  </IonTabButton>

                  <IonTabButton tab="search" href="/dic/search">
                    <IonIcon icon={search} />
                    <IonLabel>Search</IonLabel>
                  </IonTabButton>
                </IonTabBar>
              </IonTabs>
            } />
          </Route>
        </IonReactRouter>
      </IonApp>
    </Provider>
  </React.StrictMode>
);

export default App;
