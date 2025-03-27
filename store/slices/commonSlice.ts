import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CommonState {
  headerText: string;
}

const initialState: CommonState = {
  headerText: ''
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setHeaderText: (state, action: PayloadAction<string>) => {
      state.headerText = action.payload;
    }
  }
});

export const { setHeaderText } = commonSlice.actions;
export default commonSlice.reducer; 