import { createAsyncThunk } from '@reduxjs/toolkit';
import { schoolsApi } from '../api/schoolsApi';
import { RegisterSchoolRequest, SearchSchoolsRequest } from '../types/school.types';
import { RootState } from '@/shared/store/store';
import { mockSchools } from '../data/mockSchools';

export const fetchSchools = createAsyncThunk(
  'schools/fetchSchools',
  async (userId: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const { lastFetched, items } = state.schools;
      const cacheTime = 5 * 60 * 1000;
      const now = Date.now();

      if (lastFetched && now - lastFetched < cacheTime && items.length > 0) {
        return items;
      }

      // Use mock data instead of API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockSchools;
      
      // const response = await schoolsApi.getAll(userId);
      // return response.data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to fetch schools';
      return rejectWithValue(message);
    }
  }
);

export const searchSchools = createAsyncThunk(
  'schools/searchSchools',
  async (searchParams: SearchSchoolsRequest, { rejectWithValue }) => {
    try {
      const response = await schoolsApi.search(searchParams);
      return response.data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to search schools';
      return rejectWithValue(message);
    }
  }
);

export const registerSchool = createAsyncThunk(
  'schools/registerSchool',
  async (schoolData: RegisterSchoolRequest, { rejectWithValue }) => {
    try {
      const response = await schoolsApi.register(schoolData);
      return response.data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to register school';
      return rejectWithValue(message);
    }
  }
);