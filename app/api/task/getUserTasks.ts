import axios from 'axios';

export const getUserTasks = async (userId: string) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks?userId=${userId}&sort=dueDate`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data || error.message || 'An unexpected error occurred');
    } else {
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
};