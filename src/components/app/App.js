import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../home/Home';
import Movie from '../movie/Movie';
import NotFound from '../elements/notFound/NotFound';

const App = () => (
  <BrowserRouter>
    <React.Fragment>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/:movieId" component={Movie} exact />
        <Route component={NotFound} />
      </Switch>
    </React.Fragment>
  </BrowserRouter>
)

export default App;