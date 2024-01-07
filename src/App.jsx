import { Switch, Route } from 'react-router-dom';
import NewsDetails from 'pages/News/NewsDetails/NewsDetails';
import Main from 'pages/Main/Main';
import News from 'pages/News/News';
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';

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
        <Route exact path='/news/:newsId'>
          <NewsDetails />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}
