import { Switch, Route } from 'react-router-dom';
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import Main from 'pages/Main/Main';

export default function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path='/'>
          <Main />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}
