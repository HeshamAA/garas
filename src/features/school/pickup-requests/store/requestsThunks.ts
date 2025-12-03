import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestsApi, GetRequestsParams } from '../api/requestsApi';

export const fetchSchoolRequests = createAsyncThunk(
  'requests/fetchSchoolRequests',
  async (params: GetRequestsParams | undefined, { rejectWithValue }) => {
    try {
      const response = await requestsApi.getSchoolRequests(params);
      return response.data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to fetch school requests';
      return rejectWithValue(message);
    }
  }
);

export const cancelRequest = createAsyncThunk(
  'requests/cancelRequest',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await requestsApi.updateRequestStatus(id, 'canceld');
      return { id, message: response.message };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to cancel request';
      return rejectWithValue(message);
    }
  }
);
