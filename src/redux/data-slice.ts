import { ResponseI } from '@/interfaces/response.interface';
import { createSlice } from '@reduxjs/toolkit';

interface DataState {
  vehicle: string;
  brand: ResponseI | null;
  model: ResponseI | null;
  year: ResponseI | null;
}

const initialState: DataState = {
  vehicle: '',
  brand: null,
  model: null,
  year: null,
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setVehicle: (state, action) => {
      state.vehicle = action.payload;
    },
    setBrand: (state, action) => {
      state.brand = action.payload;
    },
    setModel: (state, action) => {
      state.model = action.payload;
    },
    setYear: (state, action) => {
      state.year = action.payload;
    },
  },
});

export const { setVehicle, setBrand, setModel, setYear } = dataSlice.actions;
export default dataSlice.reducer;
