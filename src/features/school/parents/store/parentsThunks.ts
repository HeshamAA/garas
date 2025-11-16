import { createAsyncThunk } from '@reduxjs/toolkit';
import { parentsApi } from '../api/parentsApi';
import { Parent, CreateParentRequest, UpdateParentRequest } from '../types/parent.types';
import { RootState } from '@/shared/store/store';

export const fetchParents = createAsyncThunk(
  'parents/fetchParents',
  async (schoolId: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const { lastFetched, items } = state.parents;
      const cacheTime = 5 * 60 * 1000;
      const now = Date.now();

      if (lastFetched && now - lastFetched < cacheTime && items.length > 0) {
        return items;
      }

      const response = await parentsApi.getAll(schoolId);
      return response.data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to fetch parents';
      return rejectWithValue(message);
    }
  }
);

export const createParent = createAsyncThunk(
  'parents/create',
  async (parentData: CreateParentRequest, { rejectWithValue }) => {
    try {
      const response = await parentsApi.create(parentData);
      return response.data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to create parent';
      return rejectWithValue(message);
    }
  }
);

export const updateParent = createAsyncThunk(
  'parents/update',
  async (parentData: UpdateParentRequest, { rejectWithValue }) => {
    try {
      const response = await parentsApi.update(parentData);
      return response.data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to update parent';
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