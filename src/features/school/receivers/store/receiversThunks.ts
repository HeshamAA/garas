import { createAsyncThunk } from '@reduxjs/toolkit';
import { receiversApi, GetReceiversParams } from '../api/receiversApi';

export const fetchReceivers = createAsyncThunk(
  'receivers/fetchReceivers',
  async (params: GetReceiversParams | undefined, { rejectWithValue }) => {
    try {
      const response = await receiversApi.getAll(params);
      return response;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to fetch receivers';
      return rejectWithValue(message);
    }
  }
);
