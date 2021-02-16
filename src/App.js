import React, { useEffect, useState } from 'react';
import { TableSortSearch } from './components/TableSortSearch';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import './App.css';

const App = () => {
  
  return (
    <div className="App">
      <div className="container-fluid rc-intro ">
        <div className="container justify-content-between ">
          <div className="row align-items-center no-gutters">
            <img className="rc-img col-3 no-gutters" src="images/logo.svg" alt="" />
            <div className="col-9">
              <h1 className="rc-title">React Challenge</h1>
              <p className="rc-description">Поиск и сортировка данных</p>
            </div>
          </div>
        </div>
      </div>


      <Router>
        <Switch>
          <Route path="/search/:search/:active">
            <TableSortSearch />
          </Route>
          <Route path="/sort/:sort/:active">
            <TableSortSearch />
          </Route>
          <Route path="/:search/:sort/:active">
            <TableSortSearch />
          </Route>
          <Route path="/:active">
            <TableSortSearch />
          </Route>
          <Route path="/">
            <TableSortSearch />
          </Route>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
