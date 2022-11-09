import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Carrinho from './components/Carrinho';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route exact path="/carrinho" component={ Carrinho } />
    </Switch>
  );
}

export default App;
