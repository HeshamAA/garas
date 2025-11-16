import { createAsyncThunk } from '@reduxjs/toolkit';
import { studentsApi } from '../api/studentsApi';
import { Student, CreateStudentRequest, UpdateStudentStatusRequest } from '../types/student.types';
import { RootState } from '@/shared/store/store';

export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async (schoolId: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const { lastFetched, items } = state.students;
      const cacheTime = 5 * 60 * 1000;
      const now = Date.now();

      if (lastFetched && now - lastFetched < cacheTime && items.length > 0) {
        return items;
      }

      const response = await studentsApi.getAll(schoolId);
      return response.data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to fetch students';
      return rejectWithValue(message);
    }
  }
);

export const updateStudentStatus = createAsyncThunk(
  'students/updateStatus',
  async (request: UpdateStudentStatusRequest, { rejectWithValue }) => {
    try {
      const response = await studentsApi.updateStatus(request.id, request.status);
      return response.data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to update student status';
      return rejectWithValue(message);
    }
  }
);

export const createStudent = createAsyncThunk(
  'students/create',
  async (studentData: CreateStudentRequest, { rejectWithValue }) => {
    try {
      const response = await studentsApi.create(studentData);
      return response.data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to create student';
      return rejectWithValue(message);
    }
  }
);

export const deleteStudent = createAsyncThunk(
  'students/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await studentsApi.delete(id);
      return id;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to delete student';
      return rejectWithValue(message);
    }
  }
);