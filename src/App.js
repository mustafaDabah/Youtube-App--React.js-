import {BrowserRouter as Router , Route , Switch } from 'react-router-dom';
import Home from './Pages/Home';
import './index';
import Layout from './Layout/Layout';
import  GlobalProvider from './ContextAPI/globalState';
import CreateThemeProvider from './Styles/Theme';
import Search from './Pages/Search';
import WatchVideo from './Pages/WatchVideo';
import Channel from './Pages/Channel';
import WatchLater from './Pages/WatchLater';
import Subscribes from './Pages/Subscribes';

function App() {
  

  return (
    <GlobalProvider>
        <CreateThemeProvider>
          <Router>
            <Layout>
              <Switch>
                  <Route exact path='/' component={Home} />
                  <Route  path='/search' component={Search} />
                  <Route  path='/watchvideo/:id' component={WatchVideo} />
                  <Route  path='/channel/:id' component={Channel} />
                  <Route  path='/watchlater' component={WatchLater} />
                  <Route  path='/subscribes' component={Subscribes} />
              </Switch> 
            </Layout>
          </Router>
        </CreateThemeProvider>
    </GlobalProvider>
  );
}

export default App;
