import React, { useState, useEffect } from 'react';
import { SearchBar } from './SearchBar';
import { Toolbar } from './toolbar/Toolbar';
import { UserList } from './users/UserList';
import { ActiveUser } from './users/ActiveUser';
import { Loading } from './Loading';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCurrentUserlist,
  activeUserChange,
  filterChange,
  toggleSort,
  statusChange
} from './users/usersSlice';

export const TableSortSearch = (props) => {
  const dispatch = useDispatch();

  const [urlParams, setUrlParams] = useState(useParams());
  const history = useHistory();

  const userList = useSelector(selectCurrentUserlist);
  const sort = useSelector(state => state.users.sort);
  const filter = useSelector(state => state.users.filter);
  const activeUser = useSelector(state => state.users.activeUser);
  const status = useSelector(state => state.users.status);

  useEffect(() => {
    if (urlParams && status === 'complete') {
      dispatch(statusChange('loading'));
      if (urlParams.search) {
        dispatch(filterChange(urlParams.search));
      }
      if (urlParams.sort) {
        const [sortParam, sortOrder] = urlParams.sort.split('-');
        dispatch(toggleSort({ sortOrder, sortParam }));
      }
      if (urlParams.active && userList.length) {
        const isActiveUserInList = userList.find(user => user.id == urlParams.active);

        isActiveUserInList ? dispatch(activeUserChange(urlParams.active)) :
          dispatch(activeUserChange(userList[0].id));
      } else if (userList.length) {
        dispatch(activeUserChange(userList[0].id));
      } else {
        dispatch(activeUserChange(null));
      }
      dispatch(statusChange('complete'));
    }
  }, []);

  useEffect(() => {
    if (status === 'complete') {
      let url = '/';
      
      if (filter && sort.param && sort.order) {
        url += `${filter}/${sort.param}-${sort.order}/`;
      } else if (filter && (!sort.param || !sort.order)) {
        url += `search/${filter}/`;
      } else if (!filter && (sort.param && sort.order)) {
        url += `sort/${sort.param}-${sort.order}/`;
      }

      if(filter && userList.length && activeUser) {
        const isActiveUserInList = userList.find(user => user.id == activeUser.id);
        if(!isActiveUserInList) dispatch(activeUserChange(userList[0].id));
      }
      
      if(filter && userList.length === 0) {
        dispatch(activeUserChange(null));
      }

      if(userList.length && !activeUser) {
        dispatch(activeUserChange(userList[0].id));
      }

      if (activeUser) {
        url += activeUser.id;
      } else {
        url += null;
      }

      history.push(url);
    }
  }, [dispatch, urlParams, history, filter, sort, activeUser]);


  if (status === 'loading') {
    return <Loading />;
  } else if (status === 'complete') {
    return (
      
      <div className="container app">
        
        <div className="row">
          <SearchBar filter={filter} />
        </div>

        <div className="row">
          <Toolbar sort={sort} />
        </div >
          
        <div className="row">
          <UserList userList={userList} status={status} activeUser={activeUser} />
          <ActiveUser activeUser={activeUser} />
        </div>
      </div>
    );
  }


  
}