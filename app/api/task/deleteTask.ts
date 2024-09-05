import axios from 'axios';

export const deleteTask = async (taskId: string) => {
  try {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${taskId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
      },
    });
    return response.status;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data || error.message || 'An unexpected error occurred');
    } else {
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
};