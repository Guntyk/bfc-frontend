import { Switch, Route, useLocation } from 'react-router-dom';
import NewsDetails from 'pages/News/NewsDetails/NewsDetails';
import NotFound from 'pages/NotFound/NotFound';
import Error from 'pages/Error/Error';
import Main from 'pages/Main/Main';
import News from 'pages/News/News';
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';

export default function App() {
  const { pathname } = useLocation();
  const allowComponentsPathnames = ['/', '/news'];

  return (
    <>
      {allowComponentsPathnames.includes(pathname) && <Header />}
      <Switch>
        <Route exact path='/'>
          <Main />
        </Route>
        <Route exact path='/news'>
          <News />
        </Route>
        <Route exact path='/news/:newsId'>
          <NewsDetails />
        </Route>
        <Route exact path='/error'>
          <Error />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
      {allowComponentsPathnames.includes(pathname) && <Footer />}
    </>
  );
}
