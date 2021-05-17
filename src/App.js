import React from "react";
import {BrowserRouter} from 'react-router-dom';
import {Route, Switch} from 'react-router';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout/Layout';
import Categories from './components/Categories/CategoriesList/CategoriesList';
import AddCategory from './components/Categories/AddCategory/AddCategory';
import EditCategory from './components/Categories/EditCategory/EditCategory';
import ShowCategory from './components/Categories/ShowCategory/ShowCategory';

const App = () => {
  return (
      <>
          <ToastContainer
              position="top-right"
              autoClose={4000}
          />
          <BrowserRouter>
              <Layout>
                  <Switch>
                      <Route path="/categories/edit" component={EditCategory} />
                      <Route path="/categories/show" component={ShowCategory} />
                      <Route path="/categories/add" component={AddCategory} />
                      <Route path="/categories" component={Categories} />
                      <Route path="/" component={Categories} />
                  </Switch>
              </Layout>
          </BrowserRouter>
      </>
  );
}

export default App;
