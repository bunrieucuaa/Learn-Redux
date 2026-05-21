import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface IUser{
    id: number,
    name: string,
    email: string
}

export interface ICreateUser{
    name: string,
    email: string
}

export interface IUpdateUser{
    id: number,
    name: string,
    email: string
}


export const fetchListUser = createAsyncThunk(
  'users/fetchListUser',
    async (_, thunkAPI) => {
      try {
        const response = await fetch("http://localhost:8000/users");
        const data = await response.json();
        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue('Failed to fetch users');
      }
    },
)

export const createNewUser = createAsyncThunk(
  'users/createNewUser',
    async (payload: ICreateUser, thunkAPI) => {
      try {
        const response = await fetch("http://localhost:8000/users", {
          headers: {
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify({...payload})
        });

        const data = await response.json();
        if (data && data.id) {
          //create success
          thunkAPI.dispatch(fetchListUser());
        }
        
        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue('Failed to create user');
      }
    },
)

export const updateUser = createAsyncThunk(
  'users/updateUser',
    async (payload: IUpdateUser, thunkAPI) => {
      try {
        const response = await fetch(`http://localhost:8000/users/${payload.id}`, {
          headers: {
            "Content-Type": "application/json"
          },
          method: "PUT",
          body: JSON.stringify({...payload})
        });

        const data = await response.json();
        if (data && data.id) {
          //update success
          thunkAPI.dispatch(fetchListUser());
        }
        
        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue('Failed to update user');
      }
    },
)

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
    async (userId: number, thunkAPI) => {
      try {
        const response = await fetch(`http://localhost:8000/users/${userId}`, {
          headers: {
            "Content-Type": "application/json"
          },
          method: "DELETE",
        });

        const data = await response.json();
        if (data) {
          //delete success
          thunkAPI.dispatch(fetchListUser());
        }
        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue('Failed to delete user');
      }
    },
)





const initialState: { listUser: IUser[], isCreateSucces: boolean } = {
  listUser: [],
  isCreateSucces: false
}

export const userSlide = createSlice({
  name: 'user123',
  initialState,
    reducers: {},
    extraReducers: (builder) => {
    builder.addCase(fetchListUser.fulfilled, (state, action) => {
        state.listUser = action.payload;
    })
      builder.addCase(createNewUser.fulfilled, (state) => {
        state.isCreateSucces = true;
    })
  },
})

export default userSlide.reducer