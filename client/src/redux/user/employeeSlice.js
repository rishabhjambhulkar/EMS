import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GetAllEmployees  } from '../../pages/api'; // Replace with your actual API function



const employeeSlice = createSlice({
  name: 'employeeObj',
  initialState: {
    employees: [],
    loading: false,
    error: null,
  },
  reducers: {
    setEmployees: (state, action) => {
      state.employees = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setEmployees, setLoading, setError } = employeeSlice.actions;

export const fetchEmployeesAndDispatch = () => async (dispatch, getState) => {
  dispatch(setLoading(true));
  try {
    const response = await GetAllEmployees();
    console.log('Fetched employees:', response.data);

    dispatch(setEmployees(response.data));

    // Log the current state after setting employees
    const state = getState();
    console.log('State after setting employees:', state.employeeData.employees); // This should log the updated employees array

  } catch (error) {
    console.error('Error fetching employees:', error);
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};


// This should be the default export
export default employeeSlice.reducer;