import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestsApi } from '../api/requestsApi';
import { 
  CreateRequestPayload, 
  UpdateRequestStatusPayload,
} from '../types/request.types';
import { RootState } from '@/shared/store/store';
import { mockPickupRequests } from '../data/mockRequests';

export const fetchUserRequests = createAsyncThunk(
  'requests/fetchUserRequests',
  async (userId: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const { lastFetched, items } = state.requests.userRequests;
      const cacheTime = 5 * 60 * 1000;
      const now = Date.now();

      if (lastFetched && now - lastFetched < cacheTime && items.length > 0) {
        return items;
      }

      // Use mock data instead of API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockPickupRequests;
      
      // const response = await requestsApi.getUserRequests(userId);
      // return response.data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to fetch user requests';
      return rejectWithValue(message);
    }
  }
);

export const fetchSchoolRequests = createAsyncThunk(
  'requests/fetchSchoolRequests',
  async (schoolId: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const { lastFetched, items } = state.requests.schoolRequests;
      const cacheTime = 5 * 60 * 1000;
      const now = Date.now();

      if (lastFetched && now - lastFetched < cacheTime && items.length > 0) {
        return items;
      }

      // Use mock data instead of API call
      const { mockSchoolRequests } = await import('../data/mockRequests');
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockSchoolRequests;
      
      // const response = await requestsApi.getSchoolRequests(schoolId);
      // return response.data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to fetch school requests';
      return rejectWithValue(message);
    }
  }
);

export const createRequest = createAsyncThunk(
  'requests/create',
  async (requestData: CreateRequestPayload, { rejectWithValue }) => {
    try {
      const response = await requestsApi.createRequest(requestData);
      return response.data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to create request';
      return rejectWithValue(message);
    }
  }
);

export const approveRequest = createAsyncThunk(
  'requests/approve',
  async (payload: UpdateRequestStatusPayload, { rejectWithValue }) => {
    try {
      const response = await requestsApi.approveRequest(payload.id, payload.reason);
      return response.data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to approve request';
      return rejectWithValue(message);
    }
  }
);

export const rejectRequest = createAsyncThunk(
  'requests/reject',
  async (payload: UpdateRequestStatusPayload, { rejectWithValue }) => {
    try {
      const response = await requestsApi.rejectRequest(payload.id, payload.reason);
      return response.data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to reject request';
      return rejectWithValue(message);
    }
  }
);

export const completeRequest = createAsyncThunk(
  'requests/complete',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await requestsApi.completeRequest(id);
      return response.data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to complete request';
      return rejectWithValue(message);
    }
  }
);