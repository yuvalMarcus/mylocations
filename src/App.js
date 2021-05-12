import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import Layout from './components/Layout/Layout';
import Categories from './components/CategoriesList/CategoriesList';
import AddCategory from './components/AddCategory/AddCategory';
import ShowCategory from './components/ShowCategory/ShowCategory';

const App = () => {
  return (
      <BrowserRouter basename="/" >
          <Layout>
              <Switch>
                  <Route path="/categories/edit/:id" component={ShowCategory} />
                  <Route path="/categories/add" component={AddCategory} />
                  <Route path="/categories/:id" component={ShowCategory} />
                  <Route path="/categories" component={Categories} />
                  <Route path="/" component={Categories} />
              </Switch>
          </Layout>
      </BrowserRouter>
  );
}

export default App;
