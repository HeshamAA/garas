import { createAsyncThunk } from '@reduxjs/toolkit';
import { receiversApi } from '../api/receiversApi';
import { 
  Receiver, 
  TrustedReceiver, 
  CreateReceiverData, 
  UpdateReceiverData,
  ReceiverStatusUpdate 
} from '../types/receiver.types';
import { RootState } from '@/shared/store/store';
export const fetchReceivers = createAsyncThunk(
  'receivers/fetchReceivers',
  async (schoolId: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const { lastFetched, items } = state.receivers.receivers;
      const cacheTime = 5 * 60 * 1000;
      const now = Date.now();

      if (lastFetched && now - lastFetched < cacheTime && items.length > 0) {
        return items;
      }

      const response = await receiversApi.getAll(schoolId);
      return response.data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to fetch receivers';
      return rejectWithValue(message);
    }
  }
);
export const fetchTrustedReceivers = createAsyncThunk(
  'receivers/fetchTrustedReceivers',
  async (schoolId: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const { lastFetched, items } = state.receivers.trustedReceivers;
      const cacheTime = 5 * 60 * 1000;
      const now = Date.now();

      if (lastFetched && now - lastFetched < cacheTime && items.length > 0) {
        return items;
      }

      const response = await receiversApi.getAllTrusted(schoolId);
      return response.data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to fetch trusted receivers';
      return rejectWithValue(message);
    }
  }
);
export const createReceiver = createAsyncThunk(
  'receivers/create',
  async (receiverData: CreateReceiverData, { rejectWithValue }) => {
    try {
      const response = await receiversApi.create(receiverData);
      return response.data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to create receiver';
      return rejectWithValue(message);
    }
  }
);
export const updateReceiver = createAsyncThunk(
  'receivers/update',
  async (receiverData: UpdateReceiverData, { rejectWithValue }) => {
    try {
      const response = await receiversApi.update(receiverData.id, receiverData);
      return response.data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to update receiver';
      return rejectWithValue(message);
    }
  }
);
export const updateReceiverStatus = createAsyncThunk(
  'receivers/updateStatus',
  async ({ id, status }: ReceiverStatusUpdate, { rejectWithValue }) => {
    try {
      const response = await receiversApi.updateStatus(id, status);
      return response.data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to update receiver status';
      return rejectWithValue(message);
    }
  }
);
export const deleteReceiver = createAsyncThunk(
  'receivers/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await receiversApi.delete(id);
      return id;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to delete receiver';
      return rejectWithValue(message);
    }
  }
);
export const approveTrustedReceiver = createAsyncThunk(
  'receivers/approveTrusted',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await receiversApi.approveTrusted(id);
      return response.data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to approve trusted receiver';
      return rejectWithValue(message);
    }
  }
);
export const rejectTrustedReceiver = createAsyncThunk(
  'receivers/rejectTrusted',
  async (id: string, { rejectWithValue }) => {
    try {
      await receiversApi.rejectTrusted(id);
      return id;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to reject trusted receiver';
      return rejectWithValue(message);
    }
  }
);
export const activateTrustedReceiver = createAsyncThunk(
  'receivers/activateTrusted',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await receiversApi.updateTrustedStatus(id, 'active');
      return response.data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to activate trusted receiver';
      return rejectWithValue(message);
    }
  }
);
export const deactivateTrustedReceiver = createAsyncThunk(
  'receivers/deactivateTrusted',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await receiversApi.updateTrustedStatus(id, 'inactive');
      return response.data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to deactivate trusted receiver';
      return rejectWithValue(message);
    }
  }
);