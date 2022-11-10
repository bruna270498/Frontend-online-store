import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Carrinho from './components/Carrinho';
import Detalhes from './components/Detalhes';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route exact path="/carrinho" component={ Carrinho } />
      <Route exact path="/detalhes/:id" component={ Detalhes } />
    </Switch>
  );
}

export default App;
