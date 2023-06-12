import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import DetailProduct from './pages/DetailProduct';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/cart" component={ Cart } />
          <Route
            exact
            path="/detail/:id"
            render={ (props) => <DetailProduct { ...props } /> }
          />
        </Switch>

      </BrowserRouter>

    );
  }
}

export default App;
