import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


const initialState = {
    status: 'idle',
    error: null,
    activeUser: '',
    userList: [],
    sort: {
        param: '',
        order: '',
    },
    filter: ''
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await fetch(`http://${window.location.host}/data.json`);
    return response.json();
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
      toggleSort(state, action) {
        const sortOrder = action.payload.sortOrder,
          sortParam = action.payload.sortParam;
        if (state.sort.order) {
            state.sort.order = sortOrder === 'asc' ? 'desc' : 'asc';
        } else {
            state.sort.order = sortOrder;
        }
        state.sort.param = sortParam;
      },
      filterChange(state, action) {
        state.filter = action.payload;
      },
      activeUserChange(state, action) {
        if(action.payload) {
          state.activeUser = state.userList.find(user => user.id == action.payload);
        } else {
          state.activeUser = null;
        }
      },
      statusChange(state, action) {
        state.status = action.payload;
      }
    },
    extraReducers: {
      [fetchUsers.pending]: (state, action) => {
          state.status = 'loading';
      },
      [fetchUsers.fulfilled]: (state, action) => {
          state.status = 'complete';
          state.userList = action.payload;
      },
      [fetchUsers.rejected]: (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
      }
    }
})

export const { toggleSort, filterChange, activeUserChange, statusChange } = usersSlice.actions;

export default usersSlice.reducer;

export const selectCurrentUserlist = state => {
    let userList = [...state.users.userList];
    const filter = state.users.filter;
    const sort = state.users.sort;

    if (state.users.filter) {
        const nums = filter.match(/\d+/g);
        if (nums) {
            userList = userList.filter((user) =>
                user.name.toLowerCase().includes(filter.toLowerCase())
                || user.phone.match(/\d+/g).join('').includes(nums.join(''))
            );
        } else {
            userList = userList.filter(user => user.name.toLowerCase().includes(filter.toLowerCase()));
        }
        
    }

    if (sort.order && sort.param) {
        const sortParam = sort.param,
          sortOrder = sort.order;
        if (sortParam === 'name') {
            userList = sortOrder === 'asc' ? userList.sort((a, b) => a.name.localeCompare(b.name)) :
                userList.sort((a, b) => b.name.localeCompare(a.name));
        } else if (sortParam === 'age') {
            userList = sortOrder === 'asc' ? userList.sort((a, b) => parseFloat(a.age) - parseFloat(b.age)) :
                userList.sort((a, b) => parseFloat(b.age) - parseFloat(a.age));
        }
    }

    return userList;

}