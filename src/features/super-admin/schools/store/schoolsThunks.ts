import { createAsyncThunk } from '@reduxjs/toolkit';
import { schoolsApi, GetSchoolsParams } from '../api/schoolsApi';

export const fetchSchools = createAsyncThunk(
  'schools/fetchSchools',
  async (params: GetSchoolsParams | undefined, { rejectWithValue }) => {
    try {
      const response = await schoolsApi.getAll(params);
      console.log(response)
      return response.data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to fetch schools';
      return rejectWithValue(message);
    }
  }
);
