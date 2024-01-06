import { Switch, Route } from 'react-router-dom';
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import Main from 'pages/Main/Main';
import News from 'pages/News/News';

export default function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path='/'>
          <Main />
        </Route>
        <Route exact path='/news'>
          <News />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}
