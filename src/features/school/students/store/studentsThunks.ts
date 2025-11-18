import { createAsyncThunk } from '@reduxjs/toolkit';
import { studentsApi, GetStudentsParams } from '../api/studentsApi';
import { UpdateStudentStatusRequest } from '../types/student.types';

export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async (params: GetStudentsParams | undefined, { rejectWithValue }) => {
    try {
      const response = await studentsApi.getAll(params);
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