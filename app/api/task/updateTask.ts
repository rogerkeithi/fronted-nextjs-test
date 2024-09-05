import { Task } from '@/utils/entities/Task';
import axios from 'axios';

export const updateTask = async (task: Omit<Task, 'id'>, taskId: string, userId: string) => {
  try {
    const response = await axios.put<Task>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${taskId}`, {...task, user_id: userId}, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
      },
    });

    const data = response.data;
    return {  
        id: data.id,
        title: data.title,
        description: data.description,
        status: data.status,
        dueDate: data.dueDate,
    };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data || error.message || 'An unexpected error occurred');
    } else {
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
};