import React, { useEffect } from 'react';
import { Header } from './features/Header';
import { TableSortSearch } from './features/TableSortSearch';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { fetchUsers } from './features/users/usersSlice';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from './features/Loading';


const App = () => {
  const dispatch = useDispatch();
  const status = useSelector(state => state.users.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers())
    }
  }, [status, dispatch])

  if (status != 'complete') {
    return (
    <div className="App">
      <Header />
      <Loading />
    </div>
    )
  } else {
    return (
      <div className="App">
        <Header />
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
    )
  }
}

export default App;
