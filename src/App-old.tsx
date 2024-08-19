import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

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

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import HomePage from './pages/HomePage';
import RadioPage from './pages/RadioPage';
import LibraryPage from './pages/LibraryPage';
import SearchPage from './pages/SearchPage';
import { playCircle, radio, library, search } from 'ionicons/icons';
import Login from './pages/Login';
import Signup from './pages/Signup';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
				<Route exact path="/signup">
					<Signup />
				</Route>

				<Route exact path="/login">
					<Login />
				</Route>

				<Route exact path="/">
					<Redirect to="/home" />
				</Route>

				<Route exact path="/">
          <IonTabs>
            <IonRouterOutlet>
              <Redirect exact path="/" to="/home" />
              {/*
              Use the render method to reduce the number of renders your component will have due to a route change.

              Use the component prop when your component depends on the RouterComponentProps passed in automatically.
            */}
              <Route path="/home" render={() => <HomePage />} exact={true} />
              <Route path="/radio" render={() => <RadioPage />} exact={true} />
              <Route path="/library" render={() => <LibraryPage />} exact={true} />
              <Route path="/search" render={() => <SearchPage />} exact={true} />
            </IonRouterOutlet>

            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/home">
                <IonIcon icon={playCircle} />
                <IonLabel>Listen now</IonLabel>
              </IonTabButton>

              <IonTabButton tab="radio" href="/radio">
                <IonIcon icon={radio} />
                <IonLabel>Radio</IonLabel>
              </IonTabButton>

              <IonTabButton tab="library" href="/library">
                <IonIcon icon={library} />
                <IonLabel>Library</IonLabel>
              </IonTabButton>

              <IonTabButton tab="search" href="/search">
                <IonIcon icon={search} />
                <IonLabel>Search</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
				</Route>
    </IonReactRouter>
  </IonApp>
);

export default App;
