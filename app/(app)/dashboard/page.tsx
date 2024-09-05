'use client'
import { LogoutButton } from "@/app/auth";
import { User } from "app/user";
import { getUserTasks } from "@/app/api/task/getUserTasks";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { deleteTask } from "@/app/api/task/deleteTask";
import { addTask } from "@/app/api/task/addTask";
import { updateTask } from "@/app/api/task/updateTask";
import { getUserIdFromSession } from "@/utils/getUserIdFromSession";
import TaskForm from "@/components/TaskForm";
import { Task } from "@/utils/entities/Task";

export default function Dashboard() {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState('');
  const [currentForm, setCurrentForm] = useState<'add' | 'edit' | null>(null);
  const [editTask, setEditTask] = useState<Task | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      if (session) {
        const userId = getUserIdFromSession(session);
        try {
          const response = await getUserTasks(userId);
          setTasks(response);
        } catch (err: any) {
          setError(err.message);
        }
      }
    };
    fetchTasks();
  }, [session]);

  const handleEdit = (task: Task) => {
    setEditTask(task);
    setCurrentForm('edit');
  };

  const handleDelete = async (taskId: number) => {
    try {
      const responseStatus = await deleteTask(taskId.toString());
      if (responseStatus === 204) {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
        setError('');
      } else {
        setError("Não foi possível excluir a tarefa");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleAddTask = async (taskData: { title: string; description: string; dueDate: string }) => {
    try {
      const userId = getUserIdFromSession(session);
      const newTaskData = { ...taskData, status: 'PENDENTE' };
      const addedTask = await addTask(newTaskData, userId);
      setTasks(prevTasks => [...prevTasks, addedTask]);
      setCurrentForm(null);
      setError('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleUpdateTask = async (taskData: { title: string; description: string; dueDate: string }) => {
    if (editTask) {
      try {
        const userId = getUserIdFromSession(session);
        const updatedTask = await updateTask({ ...editTask, ...taskData }, editTask.id.toString(), userId);
        setTasks(prevTasks => prevTasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
        setEditTask(null);
        setCurrentForm(null);
        setError('');
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  return (
    <main className="flex flex-col items-center p-5 bg-gray-100 min-h-screen">
      <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex justify-between items-center mb-4">
          <User />
          <LogoutButton />
        </div>
        <h2 className="text-2xl font-semibold mb-4">Minhas tarefas</h2>

        {tasks.length > 0 ? (
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li key={task.id} className="p-4 bg-gray-100 rounded-md shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">{task.title}</h3>
                    <p className="text-sm text-gray-500">Status: {task.status}</p>
                    <p className="text-sm text-gray-500">Descrição: {task.description}</p>
                    <p className="text-sm text-gray-500">Expira em: {new Date(task.dueDate).toLocaleString()}</p>
                  </div>
                  <div className="space-x-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                      onClick={() => handleEdit(task)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                      onClick={() => handleDelete(task.id)}
                    >
                      Deletar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhuma tarefa encontrada.</p>
        )}

        {currentForm === null && (
          <button
            className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded mt-4"
            onClick={() => setCurrentForm('add')}
          >
            Adicionar Tarefa
          </button>
        )}

        {currentForm === 'add' && (
          <TaskForm
            onSubmit={handleAddTask}
            onCancel={() => setCurrentForm(null)}
          />
        )}

        {currentForm === 'edit' && editTask && (
          <TaskForm
            initialData={editTask}
            onSubmit={handleUpdateTask}
            onCancel={() => {
              setCurrentForm(null);
              setEditTask(null);
            }}
          />
        )}

        {error && (
          <p className="mt-2 text-red-500">{error}</p>
        )}
      </div>
    </main>
  );
}
