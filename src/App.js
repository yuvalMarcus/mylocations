import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import Layout from './components/Layout/Layout';
import Categories from './components/Categories/CategoriesList/CategoriesList';
import AddCategory from './components/Categories/AddCategory/AddCategory';
import EditCategory from './components/Categories/EditCategory/EditCategory';
import ShowCategory from './components/Categories/ShowCategory/ShowCategory';

const App = () => {
  return (
      <BrowserRouter basename="/" >
          <Layout>
              <Switch>
                  <Route path="/categories/edit/:id" component={EditCategory} />
                  <Route path="/categories/show/:id" component={ShowCategory} />
                  <Route path="/categories/add/:id" component={AddCategory} />
                  <Route path="/categories/add" component={AddCategory} />
                  <Route path="/categories/:id" component={Categories} />
                  <Route path="/categories" component={Categories} />
                  <Route path="/" component={Categories} />
              </Switch>
          </Layout>
      </BrowserRouter>
  );
}

export default App;
