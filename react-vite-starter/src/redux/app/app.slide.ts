import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: { appMode: string } = {
  appMode: "light",
}

export const appSlide = createSlice({
  name: 'appMode',
  initialState,
  reducers: {
    changeMode: (state, action: PayloadAction<string>) => {
      state.appMode = action.payload
    }
    },
})
export const { changeMode } = appSlide.actions
export default appSlide.reducer