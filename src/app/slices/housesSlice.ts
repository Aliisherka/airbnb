import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiCall } from '../../shared/api';
import { House } from '../../shared/types/house';

interface SearchHousesParams {
  location: string;
  totalAdults: string;
  infants: string;
  pets: string;
  arrival: string;
  departure: string;
}

interface InitialState {
  houses: House[];
  searchResults: House[] | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: InitialState = {
  houses: [],
  searchResults: null,
  status: 'idle',
  error: null,
};

export const fetchHouses = createAsyncThunk<House[], void>(
  'houses/fetchHouses',
  async(_, { rejectWithValue }) => {
    try {
      const response = await apiCall.getHouses();

      return response
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
)

export const searchHouses = createAsyncThunk<House[], SearchHousesParams>(
  'houses/searchHouses',
  async (params, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams(params as unknown as Record<string, string>).toString();
      return await apiCall.searchHouses(query);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

const housesSlice = createSlice({
  name: 'houses',
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHouses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHouses.fulfilled, (state, action: PayloadAction<House[]>) => {
        state.status = 'succeeded';
        state.houses = action.payload
      })
      .addCase(fetchHouses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      .addCase(searchHouses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchHouses.fulfilled, (state, action: PayloadAction<House[]>) => {
        state.status = 'succeeded';
        state.houses = action.payload;
      })
      .addCase(searchHouses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  }
})

export const housesReducer = housesSlice.reducer;
export const housesActions = housesSlice.actions