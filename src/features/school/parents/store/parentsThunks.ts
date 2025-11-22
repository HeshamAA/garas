import { createAsyncThunk } from '@reduxjs/toolkit';
import { parentsApi, GetParentsParams } from '../api/parentsApi';

export const fetchParents = createAsyncThunk(
  'parents/fetchParents',
  async (params: GetParentsParams | undefined, { rejectWithValue }) => {
    try {
      const response = await parentsApi.getAll(params);
      return response.data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to fetch parents';
      return rejectWithValue(message);
    }
  }
);

export const deleteParent = createAsyncThunk(
  'parents/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await parentsApi.delete(id);
      return id;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to delete parent';
      return rejectWithValue(message);
    }
  }
);